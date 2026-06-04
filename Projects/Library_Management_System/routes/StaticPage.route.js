import express from 'express';
import { SignUpPage, HomePage, LoginPage, OtpVerification, AdminpanelPage, BooksPage, MyBooksPage } from '../controllers/StaticPage.controller.js';
import UserMiddleware from '../middleware/usermiddleware.js';
import AdminMiddleware from '../middleware/adminmiddleware.js';

const StaticPageRouter = express.Router();

StaticPageRouter.get("/", UserMiddleware, HomePage);
StaticPageRouter.get("/signup", SignUpPage);
StaticPageRouter.get("/login", LoginPage);
StaticPageRouter.get("/otp-varification", UserMiddleware, OtpVerification);
StaticPageRouter.get("/admin-panel", AdminMiddleware, AdminpanelPage);
StaticPageRouter.get("/books", UserMiddleware, BooksPage);
StaticPageRouter.get("/my-books", UserMiddleware, MyBooksPage);

export default StaticPageRouter;