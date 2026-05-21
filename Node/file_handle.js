const fs = require('fs');
const os = require('os');

// check CPU Size 
console.log(os.cpus().length);

// Create File
fs.writeFileSync("./Node/test.txt","Hello World !!!");

// Read File 

// Blocking Request 
const result = fs.readFileSync("./Node/test.txt",'utf-8');
console.log(result);

// non blocking request 
fs.readFile('./Node/test.txt','utf-8',(err,data)=>{
    console.log(data);
})

// Edit File
fs.appendFileSync('./Node/test.txt','\nHey');

// copy file
fs.cpSync('./Node/test.txt','./Node/copy.txt');

// delete file 
fs.unlinkSync('./Node/copy.txt');