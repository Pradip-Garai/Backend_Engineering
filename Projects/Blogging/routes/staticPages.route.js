import express from 'express';
import { HomePage } from '../controllers/staticpages.controller.js';
const StaticPage = express.Router();

StaticPage.get("/",HomePage);

export default StaticPage;