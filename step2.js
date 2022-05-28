const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path){
    fs.readFile(path, 'utf8',(err,data)=>{
        if(err){
            console.log(`ERROR reading ${path}: ${err}`);
            process.kill(1);
        }
        console.log(data);
    })
}

async function webCat(url){
    try{
        let res = await axios.get(url);
        console.log(res.data);
    }
    catch(err){
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }

}

let path = process.argv[2];

if(path.slice(0,4) == 'http'){
    webCat(path);
}else{
    cat(path);
}

