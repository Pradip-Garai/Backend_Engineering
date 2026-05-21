import express from 'express';
import { createUser, getUserData,updateUserDetails,DeleteUser } from '../controllers/user.controller.js';
const Router = express.Router();

Router.post('/create',createUser);
Router.get('/fetch-data/:id',getUserData);
Router.patch('/update/:id',updateUserDetails);
Router.delete('/delete/:id',DeleteUser);

export default Router;