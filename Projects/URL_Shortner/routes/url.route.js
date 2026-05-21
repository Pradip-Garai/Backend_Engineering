import express from "express";
import { generateNewShortURL,redirtedURL,analyticsURL } from '../controllers/url.controller.js';
const Router = express.Router();

Router.post('/',generateNewShortURL);
Router.get('/:shortId',redirtedURL);
Router.get('/analytics/:shortId',analyticsURL);

export default Router;