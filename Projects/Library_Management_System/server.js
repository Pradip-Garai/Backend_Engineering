import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import DataBase_Connection from './db/db.js';
import StaticPageRouter from './routes/StaticPage.route.js';
import AuthRouter from './routes/userAuth.route.js';
import AdminRouter from './routes/admin.route.js';
import BorrowRouter from './routes/borrow.route.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();


app.set("view engine","ejs");
app.set("views", path.resolve("./views"));


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended:false }));
app.use(express.static("public"));


app.use("/",StaticPageRouter);
app.use("/auth/api",AuthRouter);
app.use("/admin",AdminRouter);
app.use("/borrow", BorrowRouter);


DataBase_Connection()
.then(()=>{

    console.log(`Database Connected Successfull !!!`);

    app.listen(PORT,()=>{
      console.log(`Server Started at http://localhost:${PORT}`);
    })
})
