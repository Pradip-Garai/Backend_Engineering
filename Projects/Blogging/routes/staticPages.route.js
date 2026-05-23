import express from 'express';
import { HomePage,SignupPage,LoginPage } from '../controllers/staticpages.controller.js';
import middleware from '../middleware/user.middleware.js';
const StaticPage = express.Router();

StaticPage.get("/",middleware,HomePage);
StaticPage.get("/signup",SignupPage);
StaticPage.get("/login",LoginPage);

export default StaticPage;