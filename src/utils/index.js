"use strict";

/**
 * Convert a string to a titled string
 * 
 * @param {string} title
 * @return {string}
 *
 *@exemple 
 * let string = "title";
 * //console.log( toTitle(string) ) // Title
 *
 */
function toTitle(title){
    return title[0].toUpperCase() + title.substr(1, title.length - 1);
}

/**
 * Convert a string to a header each string starts with an uppercase letter
 * 
 * @param {string} data 
 *
 * @returns {string}
 */
 function stringToHeader(data) {
    let result = "";
    let delimiters = [" ", "_", "-"];
    let toReplace = false;

    for (var i = 0; i < data.length; i++) {
    	if ( delimiters.includes(data[i])){
    		if(i != data.length - 1) {
    			result += ( " " + data[i+1].toUpperCase() );
    			toReplace = true;
    			//console.log( "result", result);
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
    //console.log("Convet to camel case ", result);

    return toTitle(result);
}



module.exports.toTitle = toTitle;
module.exports.stringToHeader = stringToHeader;
module.exports.camel = require("./strings/camel_case");