import express from 'express';
import { Register,Login,Logout,OTPVarification } from '../controllers/auth.controller.js';
import UserMiddleware from '../middleware/usermiddleware.js';

const AuthRouter = express.Router();

AuthRouter.post("/register",Register);
AuthRouter.post("/login",Login);
AuthRouter.get("/logout",Logout);
AuthRouter.post("/verify-otp",UserMiddleware,OTPVarification);

export default AuthRouter;