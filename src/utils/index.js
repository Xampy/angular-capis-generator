"use strict";


/**
 * Convert a string to a titled string
 * 
 * @param {string} title
 * @return {string}
 *
 *@exemple 
 * let string = "title";
 * console.log( toTitle(string) ) // Title
 *
 */
function toTitle(title){
    return title[0].toUpperCase() + title.substr(1, title.length - 1);
}



module.exports.toTitle = toTitle;