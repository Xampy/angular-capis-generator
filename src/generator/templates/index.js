


//module.exports.httpGet = require("./http-verb/get.template") ;
//module.exports.httpPost = require("./http-verb/post.template") ;


module.exports.http = function(method){
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