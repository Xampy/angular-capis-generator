"use strict";


const httpVerb = require("./verb.template");
const { INDENT_TAB_SPACE } = require("../../../../config");

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


const POST_TEMPLATE_FORMAT = 
`%s(data: any, ${httpVerb.FUNCTIONS_PARAMS_PATTERN}){
${INDENT_TAB_SPACE}${INDENT_TAB_SPACE}let url = this.RESOURCE_BASE_PATH + \`/%s\`;

${INDENT_TAB_SPACE}${INDENT_TAB_SPACE}//Define a type fot the post data
${INDENT_TAB_SPACE}${INDENT_TAB_SPACE}//will be more preventive
${INDENT_TAB_SPACE}${INDENT_TAB_SPACE}let body = JSON.stringify(data);

${INDENT_TAB_SPACE}${INDENT_TAB_SPACE}return this.httpClient.post(
${INDENT_TAB_SPACE}${INDENT_TAB_SPACE}${INDENT_TAB_SPACE}url,
${INDENT_TAB_SPACE}${INDENT_TAB_SPACE}${INDENT_TAB_SPACE}body, {
${INDENT_TAB_SPACE}${INDENT_TAB_SPACE}${INDENT_TAB_SPACE}${INDENT_TAB_SPACE}headers: this.requestHeaders
${INDENT_TAB_SPACE}${INDENT_TAB_SPACE}${INDENT_TAB_SPACE}}
${INDENT_TAB_SPACE}${INDENT_TAB_SPACE}).pipe(
${INDENT_TAB_SPACE}${INDENT_TAB_SPACE}${INDENT_TAB_SPACE}catchError(this.handleError)
${INDENT_TAB_SPACE}${INDENT_TAB_SPACE});
${INDENT_TAB_SPACE}}
`


module.exports.POST_TEMPLATE_FORMAT = POST_TEMPLATE_FORMAT;
module.exports.formatTemplate = formatPostTemplate;