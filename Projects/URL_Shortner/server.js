import express from 'express';
import dotenv from 'dotenv';
import DB_Connection from './DB/db.js';
import Router from './routes/url.route.js';
dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/url',Router);


DB_Connection()
.then(()=>{
    console.log(`Database Connected!!!`);

    app.listen(PORT,()=>{
      console.log(`Server Running at Port http://localhost:${PORT}`);
    })
})

