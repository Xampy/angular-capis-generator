"use strict";
const app_utils = require("../../../utils");

const { INDENT_TAB_SPACE } = require("../../../../config");

/**
 * 
 * @param {string} resourceName the resource name as given
 * @param {string} description  the resource description
 * @param {Array<string> } functionsList genrated function list
 */
function formatTemplate(resourceName, description, functionsList) {

    let service = serviceTemplate.replace(
        RESOURCE_NAME_PATTERN, 
        app_utils.stringToHeader(resourceName)
    );

    service = service.replace(
        RESOURCE_NAME_CAMEL_CASE_PATTERN, 
        app_utils.toTitle( app_utils.camel.stringToCamelCase(resourceName)) 
    );

    service = service.replace(
        RESOURCE_NAME_RAW, 
        resourceName
    );

    
    //Adding functions signature
    let signatures = functionsList.map(
        (def, index) => {
            //Extract
            let pos = def.indexOf("{");
            return def.substring(0, pos);
        }
    );

    signatures = signatures.reduce(
        (acc, curr) => {
            console.log("start ", curr)
            return acc + "\n * + " + curr;
        }
    );

    //console.log(signatures);

    service = service.replace(
        FUNCTIONS_SIGNATURE_PATTERN, 
        signatures
    );

    //Add the functions body
    let bodies = functionsList.reduce(
        (prev, curr) => {
            return prev + `\n\n${INDENT_TAB_SPACE}` + curr;
        }
    );
    service = service.replace(
        FUNCTIONS_PATTERN, 
        bodies
    );


    return service;
}


const RESOURCE_NAME_PATTERN = '@resource_name@';
const FUNCTIONS_SIGNATURE_PATTERN = "@functions_signature@";
const RESOURCE_NAME_CAMEL_CASE_PATTERN = "'@resource_name_camel@";
const RESOURCE_NAME_RAW = "@resource@";
const FUNCTIONS_PATTERN = "@functions@";

const serviceTemplate = `
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';


/**
 * API ${RESOURCE_NAME_PATTERN}
 * 
 * @description@
 * 
 * 
 * + createPersonnePhysque(data: any)
 * + ${FUNCTIONS_SIGNATURE_PATTERN}
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class ${RESOURCE_NAME_CAMEL_CASE_PATTERN}ApiService extends  AbstractAPIRequest{
  
${INDENT_TAB_SPACE}constructor(
${INDENT_TAB_SPACE}${INDENT_TAB_SPACE}private httpClient: HttpClient
${INDENT_TAB_SPACE}) { 
${INDENT_TAB_SPACE}${INDENT_TAB_SPACE}super("${RESOURCE_NAME_RAW}"); //Set the api resource base path
${INDENT_TAB_SPACE}${INDENT_TAB_SPACE}        
${INDENT_TAB_SPACE}}

${INDENT_TAB_SPACE}${FUNCTIONS_PATTERN}
}
`

module.exports.formatTemplate = formatTemplate;