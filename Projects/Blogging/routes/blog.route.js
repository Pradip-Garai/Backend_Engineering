import express from 'express';
import { CreateBlog} from '../controllers/blog.controller.js';
const BlogRouter = express.Router();
import upload from '../service/imageUpload.js';
import middleware from '../middleware/user.middleware.js';

BlogRouter.post("/create-blog", middleware, upload.single('coverImageURL'),CreateBlog);


export default BlogRouter;