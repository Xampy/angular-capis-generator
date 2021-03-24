
/**
 * Get function template by http verb
 *  
 * @param {"get" | "post" | "patch" | "put" | "delete" } method  
 * @returns {NodeModule} based on the http verb
 */
function http(method){
    switch (method.toLowerCase()) {
        case "post":
            return require("./http-verb/post.template");
        case "get":
            return require("./http-verb/get.template");
        case "put":
            return require("./http-verb/put.template");
        case "patch":
            return require("./http-verb/patch.template");
        case "delete":
            return require("./http-verb/delete.template");        
    
        default:
            let error = `Http request method Error: method`;
            error += ` value is <${method}> but method must be a one of  get | post | put | delete | patch`;
            throw Error(error);
    }
}


/**
 * Get the service class template
 * 
 * @var {NodeModule}
 */
const service = require("./class/service-class.template");



/**
 * Get the request class template
 * 
 * @var {NodeModule}
 */
 const requestClass = require("./class/request-class.template");




module.exports.http = http;
module.exports.service = service;
module.exports.requestClass = requestClass;