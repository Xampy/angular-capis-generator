"use strict";


const { INDENT_TAB_SPACE } = require("../../../../config");

/**
 * 
 * Format the request class template the 
 *  @var api_context_path name given
 * 
 * @param {string} api_context_path the name of the api context path
 * given in the angular project environement file.
 * 
 * @example
 * //Environement file
 * environnement = {
 *  API_TEST_CONTEXT_PATH: "https://test.api/v1/"
 * }
 * 
 * let template = formatTemplate("API_TEST_CONTEXT_PATH");
 * 
 * //The result in the template will be the following int he
 * this.RESOURCE_BASE_PATH = environment.API_TEST_CONTEXT_PATH;
 * 
 * 
 * @returns {string} formatted template
 */
function formatTemplate(api_context_path) {
    //The path value don't neeed to be ended by a /
    //then clean it
    let cleaned_path = api_context_path.endsWith('/') ? api_context_path.substr(0, api_context_path.length - 1) : api_context_path;

    //May to process it in a while loop until no / at the end

    let requestClass = requestTemplate.replace(
        API_CONTEXT_PATH_NAME_PATTERN, 
        cleaned_path
    );
    return requestClass;
}


const API_CONTEXT_PATH_NAME_PATTERN = '@api_context_path@';

const requestTemplate = `
import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { throwError } from "rxjs";
import { environment } from "src/environments/environment";




/**
 * Abstract API resource
 *
 * defining global attributes and methods
 * on a given api request
 */
export abstract class AbstractAPIRequest {
    /**
     * @var RESOURCE_PATH path to accessing ressource
     */
    protected RESOURCE_BASE_PATH: string;
    protected requestHeaders: HttpHeaders
    protected resuestOptions: {};

    /**
     * Constructor of the api request class
     *
     *
     * @param pathEnd the resource end point
     */
    constructor(pathEnd: string){
        //Set the resource path end;
        this.setResouceBasePath(pathEnd);
        //Default Header
        this.requestHeaders = new HttpHeaders(
            {
                "Content-Type": "application/json"
            }
        );
        
        this.resuestOptions = {
            headers: this.requestHeaders,
        }
    }

    /**
     * Set the resource base path
     * url. Using the CONTEXT_PATH defining
     * in environnent file
     *
     * @param pathEnd the resource endpoint as the the name of the resource
     */
    setResouceBasePath(pathEnd: string){
        this.RESOURCE_BASE_PATH = environment.${API_CONTEXT_PATH_NAME_PATTERN} + \`$\{pathEnd\}\`;
    }


    /**
     * Handle eventual error on requests
     *
     *
     * @param error
     * @returns
     */
    protected handleError(error: HttpErrorResponse){
        if (error.error instanceof ErrorEvent) {
            //Client side error
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(
                \'Backend returned code $\{error.status}\',
                \'body was: $\{error.error\}\'
            );
        }
        return throwError(
            'Something bad happened; please try again later.'
        );
    }
}`

module.exports.formatTemplate = formatTemplate;