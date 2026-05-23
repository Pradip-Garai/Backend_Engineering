import express from 'express';
import { HomePage,SignupPage,LoginPage } from '../controllers/staticpages.controller.js';
const StaticPage = express.Router();

StaticPage.get("/",HomePage);
StaticPage.get("/signup",SignupPage);
StaticPage.get("/login",LoginPage);

export default StaticPage;