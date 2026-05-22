import express from 'express';
import { Register,Login,Logout } from '../controllers/user.controller.js';
const UserRouter = express.Router();

UserRouter.post("/register",Register);
UserRouter.post("/login",Login);
UserRouter.get("/logout",Logout);

export default UserRouter;