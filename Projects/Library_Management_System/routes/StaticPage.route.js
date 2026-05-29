import express from 'express';
import { SignUpPage,HomePage,LoginPage,OtpVerification } from '../controllers/StaticPage.controller.js';
import UserMiddleware from '../middleware/usermiddleware.js';

const StaticPageRouter = express.Router();

StaticPageRouter.get("/",UserMiddleware,HomePage);
StaticPageRouter.get("/signup",SignUpPage);
StaticPageRouter.get("/login",LoginPage);
StaticPageRouter.get("/otp-varification",UserMiddleware,OtpVerification);

export default StaticPageRouter;