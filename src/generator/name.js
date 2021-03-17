"use strict"

const utils = require('../utils');
const strings_camel_case = require('../strings/camel_case');


/**
 * Generate the name to use as function name in service
 * based on path
 * @param {"get" | "post" | "put" | "delete" | "patch" } method http verb for the path.
 * @param {Array<string>} path the resource path.
 * @param {Array<qtring>} arguments path arguments array
 * 
 * @returns {string}  the name of the function for the path
 * 
 * @example
 * 
 * let method = "get";
 * let path_arguments = {
 *     arguments: [
 *        { endpoint: 'collections', argument: 'collection_id' },
 *        { endpoint: 'meuble', argument: 'id' }
 *     ],
 *     path: [ 'physique', 'collections', 'meuble' ]
 * }
 * 
 * let name = generateName(method, path, arguments)
 * console.log(name) // getABById(id: any)
 */
function generateFunctionName(method, path_arguments){
    let start = "";
    switch (method.toLowerCase()) {
        case "post":
            start = "create";
            break;
        case "get":
            start = "get";
            break;
        case "put":
            start = "update";
            break;
        case "patch":
            start = "update";
            break;
        case "delete":
            start = "delete";
            break;
        
    
        default:
            let error = `Http request method Error: method`;
            error += ` value is <${method}> but method must be a one of  get | post | put | delete | patch`;
            throw Error(error);
            break;
    }

    console.log(method);
    console.log( path_arguments );


    let name = "";
    for (var i = path_arguments.path.length - 1; i >= 0; i--) {
        //Check if there is an argument associedted for this
        //endpoint
        let found_argument = path_arguments.arguments.find( (element, index) => {
            if ( element.endpoint === path_arguments.path[i]) {
                return element;
            }
        });


        name += utils.toTitle(path_arguments.path[i]);
        if(found_argument === undefined){

        }else {
            name += "By";
            name += utils.toTitle(strings_camel_case.stringToCamelCase(found_argument.argument));

        }

        name += "On";


        console.log("Check if we hace an endpoint with the name giben in path");
        console.log(found_argument === undefined);
        console.log( utils.toTitle(path_arguments.path[i]) );
    }

    name = name.substr(0, name.length - 2);
    name = method.toLowerCase() + name;
    console.log("function name => ",  name);


    return name;
}



module.exports.generateFunctionName = generateFunctionName;

