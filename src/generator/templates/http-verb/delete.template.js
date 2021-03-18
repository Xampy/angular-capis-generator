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
 function formatDeleteTemplate(name, urlParams, path){
    return httpVerb.formatTemplate(name, urlParams, path, DELETE_TEMPLATE_FORMAT);

}


const DELETE_TEMPLATE_FORMAT = `
%s(${httpVerb.FUNCTIONS_PARAMS_PATTERN}){
    let url = this.RESOURCE_BASE_PATH + \`/%s\`;

    //Define a type fot the delete data
    //will be more preventive
    //let body = JSON.stringify(data);

    return this.httpClient.delete(
        url,
        body, {
            headers: this.requestHeaders
        }
    ).pipe(
        catchError(this.handleError)
    )
}
`


module.exports.DELETE_TEMPLATE_FORMAT = DELETE_TEMPLATE_FORMAT;
module.exports.formatTemplate = formatDeleteTemplate;