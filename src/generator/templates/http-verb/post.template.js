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
 function formatPostTemplate(name, urlParams, path){
    return httpVerb.formatTemplate(name, urlParams, path, POST_TEMPLATE_FORMAT);

}


const POST_TEMPLATE_FORMAT = `
%s(${httpVerb.FUNCTIONS_PARAMS_PATTERN}){
    let url = this.RESOURCE_BASE_PATH + \`/%s\`;

    //Define a type fot the post data
    //will be more preventive
    //let body = JSON.stringify(data);

    return this.httpClient.post(
        url,
        body, {
            headers: this.requestHeaders
        }
    ).pipe(
        catchError(this.handleError)
    )
}
`


module.exports.POST_TEMPLATE_FORMAT = POST_TEMPLATE_FORMAT;
module.exports.formatTemplate = formatPostTemplate;