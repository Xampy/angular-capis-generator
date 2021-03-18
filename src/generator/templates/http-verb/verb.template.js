"use strict";


const util = require("util");
const path_parser = require("../../../parser/path");


/**
 * @var FUNCTIONS_PARAMS_PATTERN parameters position identifier will be replaced 
 * with params list if provided;
 */
const FUNCTIONS_PARAMS_PATTERN = '@params_list_arg@';
/***
 * Format the template with values without a defined name
 * 
 * @param {string} name the funtion name ( The name is generated from the path information)
 * @param { Array<string> } urlParams params list
 * @param {string} path the resource url string
 * @param {string} template http verb template
 * 
 * @returns {string}
 */
 function formatTemplate(name, urlParams, path, template){
    let functionBody = util.format(template, name, path);
    //manage function params here
    if(urlParams.length == 0){
        //No paramater
        functionBody = functionBody.replace(FUNCTIONS_PARAMS_PATTERN, '');
    }else {
        let functionParams = path_parser.formatPathArgumentToFunction(urlParams);
        functionBody = functionBody.replace(FUNCTIONS_PARAMS_PATTERN, functionParams);
    }
    return functionBody;

}


module.exports.formatTemplate = formatTemplate;
module.exports.FUNCTIONS_PARAMS_PATTERN = FUNCTIONS_PARAMS_PATTERN;