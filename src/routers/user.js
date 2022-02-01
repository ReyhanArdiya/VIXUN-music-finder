import { checkLogin } from "../utils/middleware.js";
import express from "express";
import userController from "../controllers/user.js";

const userRouter = express.Router({ mergeParams : true });

userRouter.get("/home", checkLogin, userController.renderHome);

export default userRouter;