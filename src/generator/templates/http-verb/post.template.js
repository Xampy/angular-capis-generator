"use strict";




const postTemplate = `
createPersonnePhysque(data: any){
    let url = this.RESOURCE_BASE_PATH + `/physique`;

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
    )
}`;
