const fs = require('fs');




/**
 * 
 * @param {string} name the filename
 * @param {string} dir the directory path
 * @param {any} data  the data to put in file
 * @returns 
 */
function createFile(name, dir, data){
    if(dir.endsWith('/')){
        dir = dir.substring(0, dir.length - 1);
    }
    let path = dir + '/' + name;
    if( fs.existsSync(dir) ){
        console.log(`File we be overitted`);
    }else{
        let message = `Path Error: directory [${dir}] [${path}] specified does not exists`;
        throw Error(message)
    }


    try{
        fs.writeFileSync(path, data);
    }catch(error){
        throw error;
        return false;
    }

    return true
}


module.exports.createFile = createFile;