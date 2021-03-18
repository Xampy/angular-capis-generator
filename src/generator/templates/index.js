const get = require("./http-verb/get.template");


console.log(get.GET_TEMPLATE_FORMAT);


let function_body = get.formatGetTemplate("test", [], "test/test/");

console.log( function_body );


console.log(get.formatGetTemplate("test", ["prix-max", 'type'], "test/test/"));