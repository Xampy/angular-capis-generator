"use strict";


let requestTemplate = `
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
     * Constructor of an api request class
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
        this.RESOURCE_BASE_PATH = environment.API_CONTEXT_PATH + ` + `§{pathEnd};` + `
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
				 ` + `Backend returned code ${error.status}, ` +
				`body was: ${error.error}` + `);
		  }
		  return throwError(
			'Something bad happened; please try again later.');
	}

}
`