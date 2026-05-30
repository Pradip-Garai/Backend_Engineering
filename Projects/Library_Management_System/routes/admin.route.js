import express from 'express';
import AdminMiddleware from '../middleware/adminmiddleware.js';
import { AddBook } from '../controllers/admin.controller.js';
import upload from '../services/image_upload.js';

const AdminRouter = express.Router();

AdminRouter.post("/add-book", AdminMiddleware, upload.single("bookImageURL"), AddBook);

export default AdminRouter;