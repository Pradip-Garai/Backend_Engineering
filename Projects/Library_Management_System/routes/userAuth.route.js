import express from 'express';
import { Register, Login, Logout, OTPVarification, ForgotPasswordPage, ForgotPassword, ForgotPasswordVerifyPage, ForgotPasswordVerify, ResetPasswordPage, ResetPassword } from '../controllers/auth.controller.js';
import UserMiddleware from '../middleware/usermiddleware.js';

const AuthRouter = express.Router();

AuthRouter.post("/register", Register);
AuthRouter.post("/login", Login);
AuthRouter.get("/logout", Logout);
AuthRouter.post("/verify-otp", UserMiddleware, OTPVarification);

// Forgot Password Routes
AuthRouter.get("/forgot-password", ForgotPasswordPage);
AuthRouter.post("/forgot-password", ForgotPassword);
AuthRouter.get("/forgot-password-verify", ForgotPasswordVerifyPage);
AuthRouter.post("/forgot-password-verify", ForgotPasswordVerify);
AuthRouter.get("/reset-password", ResetPasswordPage);
AuthRouter.post("/reset-password", ResetPassword);

export default AuthRouter;