import { checkLogin } from "../utils/middleware.js";
import commentsController from "../controllers/comments.js";
import express from "express";

const commentsRouter = express.Router({ mergeParams : true });
commentsRouter.use(express.json({ extended : true }));

commentsRouter.route("/")
	.post(checkLogin, commentsController.createComment);

export default commentsRouter;