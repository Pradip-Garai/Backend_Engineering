import express from 'express';
import multer from 'multer';

const ImageUploadRouter = express.Router();

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        return cb(null,"./uploaded-images");
    },
    filename: function(req,file,cb){
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage })

ImageUploadRouter.post("/upload", upload.single('profileImage') ,(req,res)=>{
    console.log(req.body);
    console.log(req.file);

    return res.redirect("/");
});

export default ImageUploadRouter;