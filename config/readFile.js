const fs = require('fs');
class ReadFile{
    constructor(){}

    getPropertiFile(fileJson){
        return new Promise((resolve, reject)=> {
            fs.readFile(__dirname+'/'+fileJson, (err, data) => {  
                if(err){
                    reject(err);
                }else{
                    let dataResponse = JSON.parse(data);
                    resolve(dataResponse);
                }
            });
        });
    }
}

module.exports= ReadFile;