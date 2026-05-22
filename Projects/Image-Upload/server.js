import express from 'express';
import StaticRouter from './routes/staticUi.route.js';
import ImageUploadRouter from './routes/imgUpload.route.js';
import path from 'path';

const app = express();
const PORT = 3000;

app.set("view engine","ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended:false }));
app.use(express.json());

app.use("/",StaticRouter);
app.use("/image",ImageUploadRouter);

app.listen(PORT,()=>{
    console.log(`Server Running at Port http://localhost:${PORT}`);
})