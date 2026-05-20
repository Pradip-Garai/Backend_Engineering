const crypto = require('crypto');

const start = Date.now();

// chnage thread pool size 
process.env.UV_THREADPOOL_SIZE = 10

crypto.pbkdf2('Password1','salt1',10000,1024,'sha256',()=>{
    console.log(`${Date.now()-start}ms`+" Password1 Done")
})

crypto.pbkdf2('Password2','salt2',10000,1024,'sha256',()=>{
    console.log(`${Date.now()-start}ms`+" Password2 Done")
})

crypto.pbkdf2('Password3','salt3',10000,1024,'sha256',()=>{
    console.log(`${Date.now()-start}ms`+" Password3 Done")
})

crypto.pbkdf2('Password4','salt4',10000,1024,'sha256',()=>{
    console.log(`${Date.now()-start}ms`+" Password4 Done")
})

crypto.pbkdf2('Password5','salt5',10000,1024,'sha256',()=>{
    console.log(`${Date.now()-start}ms`+" Password5 Done")
})

crypto.pbkdf2('Password6','salt6',10000,1024,'sha256',()=>{
    console.log(`${Date.now()-start}ms`+" Password6 Done")
})

crypto.pbkdf2('Password7','salt7',10000,1024,'sha256',()=>{
    console.log(`${Date.now()-start}ms`+" Password7 Done")
})