# ANGULAR Client API Services Generator
Generate client side api services using angular http client module. It use a .txt file describing the api resources as input.

## Motivation
Some projects are constructed using `api` architecture then after implementing on the backend, the need to create function on front-end side that call those api.

On angular project we define api caller in angular service. And it take several time to write all resource functions. To Add most fo function has the same body.

What about is those function are generated for you?

## Installation
The package is available on `npm`. And you just need to install it in developpement dependencies.

```console
npm install angular-capis-generator --save-dev
```

## Usage
To generate your api. You need to create a javascript file at the root of your project and copy and paste the code below.

### We recommend you to create this file at the the root of you project otherwise you will ask to do some other configuration. You've been warned..

``` javascript
const api_service_generator = require("angular-capis-generator");

api_service_generator.generate('./api_description.txt');
```

Or if the api description file is not in the directory as your javascript file :

``` javascript
const api_service_generator = require("angular-capis-generator");

api_service_generator.generate('path/to/api description file.txt');
```

## The API description file

To generate the services you need the api description file. Here is an example

```
--config
api_name api_test
output_dir src/app/services/api
share_dir src/app/shares
context API_CONTEXT_PATH_API_FIRST
import_path ../../shares


--resources
#books --description "Book Management API resource"
post --name default --url /books/all

#members --description "Library members API resource"
get --name default --url /members/all
```
The description file contains two parts : the configuration part (delimited by the `--config` header) and the resources list part (delimited by the `--resources` header).
## The --config
It defines the start of the set of configuration before generating api services. It takes three(3) required parameters :

#### api_name 
The name of the api. It can be arbitrary name. It's just a name for the configuration file.

It wille be useful if you have many api description file

#### output_dir
The directory in witch services files will be created. Taking a default angular project services are supposed to be in `src/app/services`. Theredore you can create a new directory for api and specified it. For exemple if you create a folder named gps-api in the default folder fo services; tour output_dir value will be
```
output_dir src/app/services/gps-api
```
##### Remark : if the directory specified does not exists already it will throw an error.

#### share_dir
It will be you default share folder. By share folder we mean, the folder in whiche you store you model, classes and others. But you can choose another folder if you want.
There will be place the mother class of generated api service class. You can make changes on it after if needed.

#### context
It's your api entry point url. I you have something like to access all capis users
```
http://localhost/capis/api/v1/users/all
```
then your api point is `http://localhost/capis/api/v1/`

But in our case will provide by angular project environnement configuration. For example if we hava an environment like this
```Typescript
export const environment = {
  production: false,
  API_CONTEXT_PATH: "http://localhost/capis/api/v1/",
  LOCAHOST_API_CONTEXT_PATH: "assets/json/api_test/"
};
```
The name doesn't matter. Make sure to match it well in the api description file configuration section. For our exemple our configuration for the context will be
```
context API_CONTEXT_PATH
```
Because in the mother class of service we have a code line that use the environnement file to configure api resources entry point :

```Typescript
this.RESOURCE_BASE_PATH = environment.API_CONTEXT_PATH + `/${pathEnd}`;
```
You can overrited if you don't want to use the environment configuration. For that just locate the mother class file and do this (same).
```Typescript
//Set the resource path end;
//this.setResouceBasePath(pathEnd);
this.RESOURCE_BASE_PATH = [ your url ] + `/${pathEnd}`;
```
And you're done.

#### import_path
It indicate where the `request-api.class.ts` will be located.

## The --resources
This line defines the start of api resource. After this line we declare api resources with their different access url.

To declare a single resource we use the character `#` followed by the name, then comme the description. Tu sum up we have
```
#[resource_name] --description [description]
```
##### The --description is required. If you dont want to put description put blank space there

After declared the resource by name, we start listing the access urls. To declare a resource access url, we use the syntax
```
[http verb or method] --name [name] --url [access url]
```
The `[http verb or method]` is required and must be on of 
##### get post update patch delete

The `[name]` is required and it's for the generated function for the current access url. If you don't have a name put the value `default` like `--name default` the pacakge will generate a name for you. But Sommetimes depending on your url the name can longer than expected.

The `[access url]` also is required. The package handles also url parameters for backend function arguments. In the url you can have 
```
{[parameter-name]}
``` 
or 
```
{[parameter1-name]}.{[parameter2-name]}
```

For example we can have
```
#resource libraries --description "Libraries management"
get --name default --url /books/all/{type}
```
and the generated name will be ` getAllByTypeOnBooks`.

To write the url value it's recommende to prefix the url with the resource name like this
```
#resource libraries --description "Libraries management"
get --name default --url /libraries/books/all/{type}
post --name newBook --url /libraries/books/
```
As result, we hava two functions defined in our file
```
getAllByTypeOnBooks(type: any)
newBook(data: any)
```
and file like this
```Typescript
/**
 * API Libraries
 * 
 * "Libraries management"
 * 
 * 
 * + getAllByTypeOnBooks(type: any)
 * + newBook(data: any)
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class LibrariesApiService extends  AbstractAPIRequest{
  
    constructor(
        private httpClient: HttpClient
    ) { 
        super("libraries"); //Set the api resource base path
                
    }

    getAllByTypeOnBooks(type: any){
        let url = this.RESOURCE_BASE_PATH + `/books/all/${type}/`;

        //Add additional headers and options here

        return this.httpClient.get(
            url
        ).pipe(
            catchError(this.handleError)
        );
    }

    newBook(data: any){
        let url = this.RESOURCE_BASE_PATH + `/books/`;

        //Define a type fot the post data
        //will be more preventive
        let body = JSON.stringify(data);

        return this.httpClient.post(
            url,
            body, {
                headers: this.requestHeaders
            }
        ).pipe(
            catchError(this.handleError)
        );
    }

}

```

## Generated Service

The above exemple will generate two angular services files.


```Typescript

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { AbstractAPIRequest } from '../../share/request-api.class';


/**
 * API Members
 * 
 * "Library members API resource"
 * 
 * 
 * + getAll()
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class MembersApiService extends  AbstractAPIRequest{
  
    constructor(
        private httpClient: HttpClient
    ) { 
        super("members"); //Set the api resource base path
                
    }

    getAll(){
        let url = this.RESOURCE_BASE_PATH + `/all/`;

        //Add additional headers and options here

        return this.httpClient.get(
            url
        ).pipe(
            catchError(this.handleError)
        );
    }
}

```
You can see that our functions are generated.

#### You need to provide your service in the app module or your package module. By default the genrated service need to be provided in the app.module.ts

After that it generates a base api request service class 
```Typescript

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
        this.RESOURCE_BASE_PATH = environment.API_CONTEXT_PATH_API_FIRST + `${pathEnd}`;
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
                'Backend returned code ${error.status}',
                'body was: ${error.error}'
            );
        }
        return throwError(
            'Something bad happened; please try again later.'
        );
    }
}
```
You can mody this file as you want as add headers, pre-process before initialization and other thing that you judge necessary.

## Fix Somme errors

## Eperimentals decorators warning
To fix this just set in `tsconfig.base.json` the value of `experimentalDecorators` to `false`.

Another way is to provide your api service class in the app module if your injectable use root.

## Environment import
`environment not find` in the `request.class.ts`; just import it base on your project structure. 