'use strict';

const parser_path =  require('./src/parser/path');

const fs = require('fs');
//fs.open()

//Read the file
fs.readFile("input_template.json", (err, data) => {
    if (err){
        console.log(err);
        return
    }

    let json = JSON.parse(data);

    //handle configuration here

    //handle resource here
    console.log("\n\nRessources\n")
    json.resources.forEach(element => {
        handleResource(element);
    });
});



function handleResource(resource) {
    console.log("Resource name : ", resource.name);
    console.log("Resource paths : ", resource.paths);
    console.log("\n");

    resource.paths.forEach((path, index) => {
        console.log(path);
        let result =  parser_path.parseArguments(path.path);

        console.log(result);
    } );


    
}
