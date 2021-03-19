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
 function formatGetTemplate(name, urlParams, path){
    return httpVerb.formatTemplate(name, urlParams, path, GET_TEMPLATE_FORMAT);

}


const GET_TEMPLATE_FORMAT = 
`%s(${httpVerb.FUNCTIONS_PARAMS_PATTERN}){
${INDENT_TAB_SPACE}${INDENT_TAB_SPACE}let url = this.RESOURCE_BASE_PATH + \`/%s\`;

${INDENT_TAB_SPACE}${INDENT_TAB_SPACE}//Add additional headers and options here

${INDENT_TAB_SPACE}${INDENT_TAB_SPACE}return this.httpClient.get(
${INDENT_TAB_SPACE}${INDENT_TAB_SPACE}${INDENT_TAB_SPACE}url
${INDENT_TAB_SPACE}${INDENT_TAB_SPACE}).pipe(
${INDENT_TAB_SPACE}${INDENT_TAB_SPACE}${INDENT_TAB_SPACE}catchError(this.handleError)
${INDENT_TAB_SPACE}${INDENT_TAB_SPACE});
${INDENT_TAB_SPACE}}`


module.exports.GET_TEMPLATE_FORMAT = GET_TEMPLATE_FORMAT;
module.exports.formatTemplate = formatGetTemplate;