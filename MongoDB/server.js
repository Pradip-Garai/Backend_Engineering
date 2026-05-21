import express from 'express';
import dotenv from 'dotenv';
import Router from './routes/user.route.js';
import DB_Connect from './DB/Mongo_Connect.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/user',Router);

DB_Connect()
.then(()=>{
    console.log(`MongoDB Connected`);
    
    app.listen(PORT,()=>{
      console.log(`Server Running at http://localhost:${PORT}`);
    })
})
