
/**
 * Convert a string to a camel case
 * 
 * @param {string} data 
 *
 * @returns {string}
 */
function stringToCamelCase(data) {
    let result = "";
    let delimiters = [" ", "_", "-"];
    let toReplace = false;

    for (var i = 0; i < data.length; i++) {
    	if ( delimiters.includes(data[i])){
    		if(i != data.length - 1) {
    			result += ( data[i+1].toUpperCase() );
    			toReplace = true;
    			console.log( "result", result);
    		}
    	}else {
    		//check for
    		if (toReplace) {
    			toReplace = false;
    		}else {
    			result += data[i];
    		}
    	}
    }
    console.log("Convet to camel case ", result);

    return result;
}


/**
 * Check if the data provided is in 
 * camel case form
 * 
 * @param {string} chain
 * @returns {boolean} true or false
 */
function isCamelCase(chain) {
    
}


/*let test = ["col_row", "col-row", "col row"];
test.forEach((element, index) => {
	console.log( stringToCamelCase(element) );
});
*/

module.exports.stringToCamelCase = stringToCamelCase;