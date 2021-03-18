"use strict";

const httpVerb = require("./verb.template");

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
    return httpVerb.formatTemplate(name, urlParams, path, GET_TEMPLATE_FORMAT);

}


const GET_TEMPLATE_FORMAT = `
%s(${httpVerb.FUNCTIONS_PARAMS_PATTERN}){
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
module.exports.formatTemplate = formatGetTemplate;