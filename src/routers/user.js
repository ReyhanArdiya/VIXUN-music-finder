import { checkLogin } from "../utils/middleware.js";
import express from "express";
import userController from "../controllers/user.js";

const userRouter = express.Router({ mergeParams : true });

userRouter.use(checkLogin);

userRouter.delete("/", userController.deleteUser);

userRouter.get("/home", userController.renderHome);

export default userRouter;