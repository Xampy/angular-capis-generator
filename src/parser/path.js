"use strict";

const camel = require("../utils/strings/camel_case");

/**
 * Parse path argument
 *
 * 
 * @param {string} path string the api resource path
 *              it can contains arguments
 * @returns <{ arguments: Array<{endpoint: string, argument: string }>, path: Array<string> }>
 * a collection. 
 * arguments consists on an array of object
 * The endpoitn represents the last path end point just before the arguments.
 * The argment is the real value of the wanted argument
 * 
 */
function parseArguments(path) {
    let limiter = "/";
    let result = {arguments: [], path: []};

    let components = path.split(limiter, -1);
    //console.log(components);

    //Need to handle double parmaters value
    //exemple /a/id/b/id
    //handled [OK]


    function processArgument(item, index){
        if ( item.startsWith("{") && item.endsWith("}")  ) {
            //Remove it from path components

            //Process the item for braces
            let p = item.substring(1, item.length - 1);
            if ( p.includes("{") || p.includes("}") ) {
                throw Error(`Parsing Error : path argument contains a brace -${item}`)
            }
            ////console.log( p );

            let subs = 1
            let pathEndPoint = components.length > 2 ? components[index - subs] : null; //[Handle on argument with no post resource in the path]
            while( pathEndPoint != null && (pathEndPoint.includes("{") && pathEndPoint.includes("}"))  ){
                //console.log("searching path ", pathEndPoint);
                subs += 1;
                pathEndPoint = components[index - subs];
                //console.log("searching path ", pathEndPoint);
            }
            //console.log("pathEndPoint ", pathEndPoint);
            if (pathEndPoint == null) {
                //We have a slash before our argument
                pathEndPoint = "Resource";
            }
            let data = {
                endpoint: pathEndPoint,
                argument: p,
            }
            //console.log("arguments ", data);
            result.arguments = [...result.arguments, data];
        }
    }


    components = components.filter( function(element){ return element !== '' } );
    components.map( function(item, index){
        //Path allows . to be in the path string ex : ??{arg_1}.{arg_2}
        //Symfony uses it much
        //console.log(components);
        //console.log(item);
        if( item.includes("{") && item.includes("}") && item.includes(".") ){
            let path_arguments = item.split('.');
            path_arguments.forEach(
                (path_argument, pa_index) => {
                    processArgument(path_argument, index);
                }
            );
        }else if ( item.includes("{") && item.includes("}") )  {
            processArgument(item, index)
        }else {
            //Nothing do here
            //unless we want to process the
            //path component to be right as it needs
            //to be
        }
    });

    //Filter the components array from the arguments
    components = components.filter((element, index) => {
        for (var i = result.arguments.length - 1; i >= 0; i--) {
            if ( element.includes(result.arguments[i].argument)  ){
                return false;
            }
        }
        return true;
    });

    let isAlone = result.arguments.filter((item, index)=> item.endpoint === "Resource").length ==  result.arguments.length;
    result.path =  isAlone ? ["Resource"] : components;
    return result;    
}


/**
 * 
 * Format an array of string params to
 * to a string. A generated function function 
 * will use it as list of paramter
 * 
 * 
 * @param {Array<string>} params
 * @returns {string}
 * 
 * @example 
 * let params = ['a', 'b'];
 * //console.log( formatPathArgumentToFunction(params)); // "a: any, b: any"
 */
 function formatPathArgumentToFunction(params){
    let result = "";
    for (let index = 0; index < params.length; index++) {
        const element = params[index];
        result += (  camel.stringToCamelCase(element)    + ": any, ");
        
    };
    return result.substr(0, result.length - 2); //Avoid the last space and the last comma
}




/**
 * Format the url using the arguments
 * transfor argument in the url to camel casse to match
 * the function which will use it argument
 * 
 * @param { { arguments: Array<{endpoint: string, argument: string }>, path: Array<string> } } data 
 * @returns {string}
 */
function formatUrlForFunction(data){
    let result = "";
    data.path.forEach(path => {
        result += ( path + "/" );
        //Add arguments
        let arguments_ = [];
        arguments_ = data.arguments.filter(
            (element, index) => {
                return element.endpoint === path;
            }
        );

        arguments_.forEach(
            (item, arg_index) => {
                result += ( `\$\{${camel.stringToCamelCase(item.argument)}\}/` ); //Remark the end slash                
            }
        );
    });


    //Process the url if it contains Resource
    //means no post resource before arguments

    //The url statrs with /Resource
    if( data.path.includes("Resource")){
        return result.slice("/Resource".length);
    }
    return result;
}











module.exports.formatUrlForFunction = formatUrlForFunction;
module.exports.parseArguments = parseArguments;
module.exports.formatPathArgumentToFunction = formatPathArgumentToFunction;
