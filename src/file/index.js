const fs = require('fs');





function createFile(name, dir, data){
    let path = dir + '/' + name;
    if( fs.existsSync(path) ){
        console.log(`File we be overitted`);
    }else{
        
    }


    try{
        fs.writeFileSync(path, data);
    }catch(error){
        return false;
    }

    return true
}


module.exports.createFile = createFile;