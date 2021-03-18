"use strict";
const util = require("util");
const path_parser = require("../../../parser/path");

const FUNCTIONS_PARAMS_PATTERN = '@params_list_arg@';
/***
 * Format the template with values without a defined name
 * 
 * @param {string} name the funtion name ( The name is generated from the path information)
 * @param { Array<string> } urlParams params list
 * @param {string} path the resource url string
 * 
 * @returns {string}
 */
 function formatGetTemplate(name, urlParams, path){
    let functionBody = util.format(GET_TEMPLATE_FORMAT, name, path);
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

/**
 * @var getTemplate get function template
 */
const getTemplate = `
getPersonneAll(){
    let url = this.RESOURCE_BASE_PATH + "/all";

    //Add additional headers and options here

    return this.httpClient.get(
        url
    ).pipe(
        catchError(this.handleError)
    );
}
`

const GET_TEMPLATE_FORMAT = `
%s(${FUNCTIONS_PARAMS_PATTERN}){
    let url = this.RESOURCE_BASE_PATH + \`/%s\`;

    //Add additional headers and options here

    return this.httpClient.get(
        url
    ).pipe(
        catchError(this.handleError)
    );
}
`


module.exports.GET_TEMPLATE_FORMAT = GET_TEMPLATE_FORMAT;
module.exports.formatGetTemplate = formatGetTemplate;