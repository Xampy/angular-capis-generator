"use strict"

/**
 * Parse path argument
 *
 * 
 * @param {string} path string the api resource path
 *              it can contains arguments
 * @returns <{ arguments: Array<{endpoint: string, argument: string }>, path: Array<string> }>
 * a collection. 
 * arguments consists on an array of object
 * The endpoitn represents the last path end point just before the arguments.
 * The argment is the real value of the wanted argument
 * 
 */
function parseArguments(path) {
    let limiter = "/";
    let result = {arguments: [], path: []};

    let components = path.split(limiter, -1);


    //Need to handle double parmaters value
    //exemple /a/id/b/id
    //handled [OK]


    components = components.filter( function(element){ return element !== '' } );
    components.map( function(item, index){
        //Check for braces
        if ( item.startsWith("{") && item.endsWith("}")  ) {
            //Remove it from path components

            //Process the item for braces
            let p = item.substring(1, item.length - 1);
            if ( p.includes("{") || p.includes("}") ) {
                throw Error(`Parsing Error : path argument contains a brace -${item}`)
            }
            //console.log( p );

            let pathEndPoint = components[index - 1];
            let data = {
                endpoint: pathEndPoint,
                argument: p,
            }

            

            result.arguments = [...result.arguments, data];

            
        }
    });

    //Filter the components array from the arguments
    components = components.filter((element, index) => {
        for (var i = result.arguments.length - 1; i >= 0; i--) {
            if ( element.includes(result.arguments[i].argument)  ){
                return false;
            }
        }
        return true;
    });

    result.path = components;
    return result;    
}

module.exports.parseArguments = parseArguments;
