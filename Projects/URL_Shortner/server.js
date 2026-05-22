import express from 'express';
import dotenv from 'dotenv';
import DB_Connection from './DB/db.js';
import Router from './routes/url.route.js';
import StaticRouter from './routes/static.routes.js';
import UserRouter from './routes/user.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine","ejs");
app.set("views", path.resolve("./views"));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use('/url',Router);
app.use("/",StaticRouter);
app.use("/user",UserRouter);


DB_Connection()
.then(()=>{
    console.log(`Database Connected!!!`);

    app.listen(PORT,()=>{
      console.log(`Server Running at Port http://localhost:${PORT}`);
    })
})

