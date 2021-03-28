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
 function formatDeleteTemplate(name, urlParams, path){
    return httpVerb.formatTemplate(name, urlParams, path, DELETE_TEMPLATE_FORMAT);

}


const DELETE_TEMPLATE_FORMAT = 
`%s(${httpVerb.FUNCTIONS_PARAMS_PATTERN}){
${INDENT_TAB_SPACE}${INDENT_TAB_SPACE}let url = this.RESOURCE_BASE_PATH + \`/%s\`;

${INDENT_TAB_SPACE}${INDENT_TAB_SPACE}//Define a type fot the delete data
${INDENT_TAB_SPACE}${INDENT_TAB_SPACE}//will be more preventive

${INDENT_TAB_SPACE}${INDENT_TAB_SPACE}return this.httpClient.delete(
${INDENT_TAB_SPACE}${INDENT_TAB_SPACE}${INDENT_TAB_SPACE}url,{
${INDENT_TAB_SPACE}${INDENT_TAB_SPACE}${INDENT_TAB_SPACE}${INDENT_TAB_SPACE}headers: this.requestHeaders
${INDENT_TAB_SPACE}${INDENT_TAB_SPACE}${INDENT_TAB_SPACE}}
${INDENT_TAB_SPACE}${INDENT_TAB_SPACE}).pipe(
${INDENT_TAB_SPACE}${INDENT_TAB_SPACE}${INDENT_TAB_SPACE}catchError(this.handleError)
${INDENT_TAB_SPACE}${INDENT_TAB_SPACE});
${INDENT_TAB_SPACE}}
`


module.exports.DELETE_TEMPLATE_FORMAT = DELETE_TEMPLATE_FORMAT;
module.exports.formatTemplate = formatDeleteTemplate;