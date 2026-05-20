const fs = require('fs');

setTimeout(()=> console.log("Timer"),0);

setImmediate(()=> console.log("Immediate"));


fs.readFile("text.txt","utf-8", ()=>{
    console.log("File Reading Complete");

    setTimeout(()=> console.log("Timer2"),0);
    setTimeout(()=> console.log("Timer3"),5*1000);
})

console.log("Hello");