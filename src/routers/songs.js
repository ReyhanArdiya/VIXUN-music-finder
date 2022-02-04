import commentsRouter from "./comments.js";
import express from "express";
import favoriteRouter from "./favorite.js";
import songsController from "../controllers/songs.js";
import { addLastVisitedToSes, checkLogin } from "../utils/middleware.js";

const songsRouter = express.Router();
songsRouter.use(express.urlencoded({ extended : true }));

songsRouter.get("/", songsController.index);

songsRouter.get("/top", songsController.sendTopHits);

songsRouter.use("/:id/comments", checkLogin, commentsRouter);

songsRouter.use("/:id/favorite", favoriteRouter);

songsRouter.route("/:id")
	.get(addLastVisitedToSes, songsController.getASong)
	.delete(
		// TODO add is admin checker here
		songsController.deleteSong
	);

export default songsRouter;