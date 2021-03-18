"use strict"

const packageUtils = require('../../utils');
const strings_camel_case = require('../../utils/strings/camel_case');


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
 * //console.log(name) // getABById(id: any)
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

    //console.log(method);
    //console.log( path_arguments );


    let name = "";

    for (var i = path_arguments.path.length - 1; i >= 0; i--) {
        //Check if there is an argument associedted for this
        //endpoint

        //console.log("Working path ", path_arguments.path[i]);
        let found_arguments = path_arguments.arguments.filter( (element, index) => {
            if ( element.endpoint === path_arguments.path[i]) {
                return true;
            }
        });


        name += strings_camel_case.stringToCamelCase( packageUtils.toTitle(path_arguments.path[i]) );

        if(found_arguments === undefined){
            //Need to add the argument in the name of the function
            //handled [False]
        }else {

            found_arguments.forEach(
                (arg, arg_index) => {
                    name += "By";
                    name += packageUtils.toTitle(strings_camel_case.stringToCamelCase(arg.argument));
                }
            );

            
        }
        name += "On";

        //console.log("Check if we hace an endpoint with the name giben in path");
        //console.log(found_arguments === undefined);
        //console.log( packageUtils.toTitle(path_arguments.path[i]) );
    }

    name = name.substr(0, name.length - 2);
    name = start + name;
    //console.log("function name => ",  name);


    return name;
}



module.exports.generateFunctionName = generateFunctionName;

