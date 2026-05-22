import express from "express";
import { HomePage,LoginPage,SignupPage } from "../controllers/staticPage.controller.js";
import UserMiddleware from "../middleware/user.middleware.js";

const StaticRouter = express.Router();


StaticRouter.get("/",UserMiddleware,HomePage);
StaticRouter.get("/login",LoginPage);
StaticRouter.get('/signup',SignupPage);

export default StaticRouter;