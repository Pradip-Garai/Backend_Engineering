import express from 'express';

const app = express();


app.get('/',(req,res)=>{
    res.send("Hello This is Home Page")
})

app.get('/about',(req,res)=>{
    res.send(`Hello ${req.query.name} !!! you are ${req.query.age} years old `);
})

app.listen(3000,()=>{
    console.log(`Server Running at http://localhost:${3000}`);
})