'use strict';

const parser_path = require('./src/parser/path');
const generator   = require('./src/generator');

const fs = require('fs');
//fs.open()

//Read the file
fs.readFile("input_template.json", (err, data) => {
    if (err){
        //console.log(err);
        return
    }

    let json = JSON.parse(data);

    //handle configuration here

    //handle resource here
    //console.log("\n\nRessources\n")
    let resourceServicesDescription =  json.resources.map( (element, index) => {
        return {
            resource_name: element.name, 
            methods: handleResource(element)
        };
    });

    resourceServicesDescription.forEach(resource => {
        console.log(resource.resource_name);
        console.log(resource.methods.length);


        let service = generator.template.service.formatTemplate( 
            resource.resource_name, 
            "Gestion des personnes", 
            resource.methods
        );
        
        console.log(service);

    });
    

   
});


/**
 * 
 * @param {string} resource 
 * @returns { Array< string > } generated function strings
 */
function handleResource(resource) {
    //console.log("Resource name : ", resource.name);
    //console.log("Resource paths : ", resource.paths);
    //console.log("\n");

    return resource.paths.map((path, index) => {
        //console.log(path);

        let method = path.method;
        let result =  parser_path.parseArguments(path.path);
        //console.log("Parse url arguments\n", result);

        let functionName = generator.function_name.generateFunctionName(method, result);

        let url = parser_path.formatUrlForFunction(result);
        //console.log(url);
        //console.log(functionName);

        //console.log("AZrguments list", arguments);
        let arguments_ = result.arguments.map(
            (item) => {
                return item.argument;
            }
        );

        let func = generator.template.http(method).formatTemplate(
            functionName, arguments_, parser_path.formatUrlForFunction(result) );
        
        //console.log(func);
        return func;

        
    } );


    
}
