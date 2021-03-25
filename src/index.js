


'use strict';

const fs = require('fs');
const lineReader = require('readline');


const {SPECIAL_SECTION_HEADERS, REQIEST_API_CLASS_FILENAME} = require('../config');

const parser_path = require('./parser/path');
const generator   = require('./generator');
const file_creator = require('./file');




/**
 * 
 * @param {{name: string, paths: Array<string> }} path 
 * @param {string} resource the resource name
 * @returns { {name: string, definition: string} } generated function strings
 */
function handleResourceUrl(path, resource) {
    //console.log("Resource name : ", resource.name);
    //console.log("Resource paths : ", resource.paths);
    //console.log("\n");

    let cleaned_path = path.path.replace(resource, '');
    if(cleaned_path.startsWith('//'))
        cleaned_path = cleaned_path.replace('//', '/')
    if(!cleaned_path.startsWith('/'))
        cleaned_path = "/" + cleaned_path;

    let method = path.method;
    let result =  parser_path.parseArguments(cleaned_path);
    //console.log("Parse url arguments\n", result);

    let functionName = path.name;
    if(path.name == "default")
        functionName = generator.function_name.generateFunctionName(method, result);

    //Url to be used in the function body
    //to make the complete resource path
    let url = parser_path.formatUrlForFunction(result);

    //console.log("AZrguments list", arguments);
    let arguments_ = result.arguments.map(
        (item) => {
            return item.argument;
        }
    );

    let func = generator.template.http(method).formatTemplate(
        functionName, arguments_, url );
        
    //console.log(func);
    return {name: functionName, defintion: func};    
}


/**
 * 
 * @param {string} filePath the file path containing the configuration
 * and resources
 */
function processApiByConfig(filePath){
    if(!filePath.endsWith('.txt') ){
        console.log("Sytax need a .txt file nothing else");
        process.exit(1);
    }

    //[Start reding file ]

    let readerInterface = lineReader.createInterface({
        input: fs.createReadStream(filePath)
    });


    let currentHeader = "" //Current header we are processing
    let currentResource = "" //Current resource


    let config = {};


    /**
     * @var resourceServiceDescription a single service description
     * name and function bodies
     */
    let resourceServiceDescription = {resource_name: "", description: "", methods: []}


    readerInterface.on("line", (input ) => {

        //console.log("header ", currentHeader);
        //console.log(currentResource);
        //Get section header
        //Special line starts with --
        if(input.length > 0)
            if ( input.startsWith("--") ) {
                //We have a section to process
                //Data to handle

                let data = input.substr(2, input.length).trimLeft().trimRight();

                if(SPECIAL_SECTION_HEADERS.includes(data)){
                    currentHeader = data;
                }else {
                    let t = `Header section not recognized section headers are < ${ SPECIAL_SECTION_HEADERS.reduce((acc, curr) => { return acc + " | " + curr }) } >`;
                    throw Error(t);
                }
            }else {
                //Here we have to process 
                //header section data
                if(currentHeader.length > 0){
                    //Check the input
                    if(input.length > 0){
                        //Process the section header data
                        //Handle config here                    
                        if( currentHeader == "config" ){
                            //Split the line by soace
                            let data = input.split(" ");
                            //console.log(data);
                            
                            if(data.length == 2){
                                //Need to make control on the config key
                                if(data[1].length > 0){
                                    //Clean the value data
                                    //from double quote or single code [Handled NO]
                                    config[data[0]] = data[1];
                                }else {
                                    //Throw config value error
                                }
                            }else {
                                //Throw config key error
                                throw Error("Config Parsing Error: config needs to have tow options key value");
                            }
                        }else if (currentHeader == "resources") {
                            //It may starts with a #
                            
                            if( input.startsWith("#") ){
                                //console.log(input);

                                let info_option_index = input.indexOf("--description");
                                if(info_option_index != -1){
                                    let res = input.substring(1, info_option_index).trim() ; //Avoid the #
                                    //In the resource name may a space
                                    //need to be handled
                                    //[handeled NO]
                                    let des = input.substring(info_option_index + "--description".length + 1, input.length);

                                    currentResource = res;
                                    //Update the current resource name
                                    if(resourceServiceDescription.resource_name != res){
                                        //We have a new resource to handle

                                        //Before we process the mas resource saved
                                        if(resourceServiceDescription.resource_name.length > 0 && resourceServiceDescription.resource_name != ""){
                                            //Manage the service file data


                                            let motherClassImportPath = 'share_dir' in config ? config.share_dir:  (() => { console.log("You have not a share_dir configured"); process.exit(1)})() ;
                                            //console.log(motherClassImportPath);
                                            motherClassImportPath += `/${REQIEST_API_CLASS_FILENAME}`;
                                            //Format the template with the resource
                                            //data
                                            let serviceData = generator.template.service.formatTemplate( 
                                                resourceServiceDescription.resource_name, //The resource name
                                                resourceServiceDescription.description,  //The resource description
                                                resourceServiceDescription.methods, // The resource methods functions and bodies
                                                motherClassImportPath
                                            );
                                            //Create it's service file in the directory
                                            //specified
                                            
                                            //service name
                                            let serviceName = `${resourceServiceDescription.resource_name}-api.service.ts`;
                                            console.log("Generating service class");
                                            let output_dir = 'output_dir' in config ? config.output_dir:  (() => { console.log("You have not a output_dir configured"); process.exit(1)})() ;
                                            //console.log("Output dir ", output_dir);
                                            if( file_creator.createFile(serviceName, output_dir, serviceData) )
                                                console.log(`[OK] Service Generated   - Resource ${resourceServiceDescription.resource_name}` );



                                            //Reinit the resource service description
                                            resourceServiceDescription = {resource_name: "", description: "", methods: []}

                                        }

                                        resourceServiceDescription.resource_name = res;
                                        resourceServiceDescription.description = des;
                                    }else {
                                        
                                    }

                                    //console.log({resource: res, description: des}, "\n\n");
                                }else {
                                    throw Error("Option parsin Error: can not find --description on your resource definition line");
                                }
                                
                            }else {
                                //Process the resource lines
                                if(currentResource.length > 0){
                                    //Now we have a resource path line
                                    //console.log("Path line ", input);

                                    let name_index = input.indexOf("--name");
                                    let url_index = input.indexOf("--url");

                                    if(name_index == -1 || url_index == -1){
                                        throw Error("Path Error: path line need to contain --name and --url");
                                    }


                                    //Check methods
                                    //[Need to be improved handled NO]
                                    if(input.startsWith('get') || input.startsWith('post') || input.startsWith('patch') ||
                                        input.startsWith('put') || input.startsWith('delete')){
                                        //Lets go on
                                        let method = input.substring(0, name_index).trim();
                                        let name = input.substring(name_index + "--name".length + 1, url_index).trim();
                                        let url = input.substring(url_index + "--url".length + 1, input.length).trim();
                                        
                                        let element = {
                                            name: name,
                                            method: method,
                                            path: url
                                        }

                                        



                                        //Generate the fonction
                                        //resourceServicesDescription
                                        let func = handleResourceUrl(element, resourceServiceDescription.resource_name);
                                        resourceServiceDescription.methods.push(func.defintion);

                                        console.log(`[SUCCESS] Function ${func.name} Generated`);


                                    }else {
                                        let message = `Http ver error: the path must start with full lowercase http verb; no space at start \nYour line  ${input}`;
                                        throw Error(message);
                                    }
                                }
                            }
                        }else {
                            //Unhandled header section
                        }
                        
                    }else {
                        //Input is empty
                        console.log("Empty line");
                    }
                }else {
                    //Nothing to do
                }
            }


    });


    readerInterface.on('close', () => {
        //It remains on service to generate
        if ( resourceServiceDescription.resource_name != "" && resourceServiceDescription.methods.length > 0 ) {
            //Format the template with the resource
            //data
            let motherClassImportPath = 'share_dir' in config ? config.share_dir:  (() => { console.log("You have not a share_dir configured"); process.exit(1)})() ;
            //console.log(motherClassImportPath);
            motherClassImportPath = motherClassImportPath += `/${REQIEST_API_CLASS_FILENAME}`;;
            //Format the template with the resource
            //data
            let serviceData = generator.template.service.formatTemplate( 
                resourceServiceDescription.resource_name, //The resource name
                resourceServiceDescription.description,  //The resource description
                resourceServiceDescription.methods, // The resource methods functions and bodies
                motherClassImportPath
            );
            //Create it's service file in the directory
            //specified
            //console.log(motherClassImportPath);

            //service name
            let serviceName = `${resourceServiceDescription.resource_name}-api.service.ts`;
            console.log("Generating service class");
            let output_dir = 'output_dir' in config ? config.output_dir:  (() => { console.log("You have not a output_dir configured"); process.exit(1)})() ;
            if( file_creator.createFile(serviceName, output_dir, serviceData) )
                console.log(`[OK] Service Generated   - Resource ${resourceServiceDescription.resource_name}` );
        }

        resourceServiceDescription = null;
        console.log("\n\nGenerating Services Finished with success");


        //Create necessary files as the mother class
        let context = 'context' in config ? config.context:  (() => { console.log("You have not a context configured"); process.exit(1)})() ;
        let requestClassData = generator.template.requestClass.formatTemplate(
            context
        );
        //Create it's service file in the directory
        //specified

        //service name
        let requestClassFileName = `${REQIEST_API_CLASS_FILENAME}.ts`;
        console.log("Generating service class");
        if( file_creator.createFile(requestClassFileName, config.share_dir, requestClassData) ){
            console.log(`[OK] Service Request Generated`);
            console.log("\n\n\nYour client side api was was generated successfully\n\n\n");
        }else {
            console.log("\n\nAn error occured while creating file\n\n");
        }

        
    });
}


module.exports.generate =  processApiByConfig;
