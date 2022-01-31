import { checkLogin } from "../utils/middleware.js";
import express from "express";
import userController from "../controllers/user.js";

const userRouter = express.Router({ mergeParams : true });

userRouter.get("/:id", checkLogin, userController.renderHome);

export default userRouter;