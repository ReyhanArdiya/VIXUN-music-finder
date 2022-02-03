import { checkLogin } from "../utils/middleware.js";
import express from "express";
import userController from "../controllers/user.js";

const userRouter = express.Router({ mergeParams : true });

// TODO add checklogin here later after testing and implemented the client's button
userRouter.delete("/", userController.deleteUser);

userRouter.get("/home", checkLogin, userController.renderHome);

export default userRouter;