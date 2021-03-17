





function getGetTemplate(){
	
}


const get = 
`
%s() {
	let url = this.RESOURCE_PATH + %s;
	
	return this.httpClient.get<any>(
		url
	)
}
`

const post = 
`
%s() {
	let url = this.RESOURCE_PATH + %s;
	let options = {
		headers: this.requestHeaders
	};

	return this.httpClient.post<any>(
		url,
		body,
		options
	)
}
`