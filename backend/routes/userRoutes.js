import express from "express";
import { getCars, getUser, loginUser, registerUser } from "../controller/userController.js";
import { protect } from "../middleware/auth.js";


const userRouter= express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser)
userRouter.get('/data',protect,getUser)
userRouter.get('/cars',getCars)

export default userRouter;