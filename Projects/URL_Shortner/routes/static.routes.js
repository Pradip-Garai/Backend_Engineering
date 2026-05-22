import express from "express";
import { HomePage } from "../controllers/staticPage.controller.js";

const StaticRouter = express.Router();


StaticRouter.get("/",HomePage);

export default StaticRouter;