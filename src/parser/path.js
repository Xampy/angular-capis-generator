"use strict"

/**
 * Parse path argument
 *
 * 
 * @param {string} path string the api resource path
 *              it can contains arguments
 * @returns {Array<{endpoint: string, argument: string}>} array of object. The endpoitn represents
 * the last path end point just before the arguments. The argment is the real value of the wanted argument
 * 
 */
module.exports.parseArguments =  function parseArguments(path) {
    let limiter = "/";
    let result = [];

    let components = path.split(limiter, -1);


    //Need to handle double parmaters value
    //exemple /a/id/b/id

    components.map( function(item, index){
        //Check for braces
        if ( item.startsWith("{") && item.endsWith("}")  ) {
            //Remove it from path components
            components.filter( function(element){ return element !== item } );

            //Process the item for braces
            let p = item.substring(1, item.length - 1);
            if ( p.includes("{") || p.includes("}") ) {
                throw Error(`Parsing Error : path argument contains a brace -${item}`)
            }
            //console.log( p );

            let pathEndPoint = components[index - 1];
            let data = {
                endpoint: pathEndPoint,
                argument: p
            }

            result.push( data );
        }
    });
    return result;    
}
