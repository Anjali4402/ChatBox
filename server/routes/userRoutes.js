import express from 'express';
import { checkAuth, login, signup, updateProfile } from '../controllers/userController.js';
import { proctedRoute } from '../middleware/auth.js';


const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.put("/update-profile", proctedRoute, updateProfile);
userRouter.get("/check", proctedRoute, checkAuth);


export default userRouter;

