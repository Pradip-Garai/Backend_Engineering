const fs = require('fs');

// Create File
fs.writeFileSync("./Node/test.txt","Hello World !!!");

// Read File 
const result = fs.readFileSync("./Node/test.txt",'utf-8');
console.log(result);

fs.readFile('./Node/test.txt','utf-8',(err,data)=>{
    console.log(data);
})

// Edit File
fs.appendFileSync('./Node/test.txt','\nHey');

// copy file
fs.cpSync('./Node/test.txt','./Node/copy.txt');

// delete file 
fs.unlinkSync('./Node/copy.txt');