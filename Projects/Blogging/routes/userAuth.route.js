import express from 'express';
import { Signup,Login } from '../controllers/auth.controller.js';
const AuthRouter = express.Router();


AuthRouter.post("/register",Signup);
AuthRouter.post("/login",Login);

export default AuthRouter;