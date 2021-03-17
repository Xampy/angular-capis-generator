"use strict"


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
 * let url = "/a/b/{id}";
 * 
 * let path = ['a', 'b'];
 * let arguments = ['id'];
 * 
 * let name = generateName(method, path, arguments)
 * console.log(name) // getABById(id: any)
 */
function generateName(method, path, arguments){
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
            let error = "Http request method Error: method";
            error += " value is ${method} but method must be a one of  get | post | put | delete | patch";
            throw Error(error);
            break;
    }

    console.log(method);
}