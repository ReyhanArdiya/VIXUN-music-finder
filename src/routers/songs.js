import { addLastVisitedToSes } from "../utils/middleware.js";
import commentsRouter from "./comments.js";
import express from "express";
import songsController from "../controllers/songs.js";

const songsRouter = express.Router();
songsRouter.use(express.urlencoded({ extended : true }));

songsRouter.get("/", songsController.index);

songsRouter.get("/top", songsController.sendTopHits);

songsRouter.use("/:id/comments", commentsRouter);

songsRouter.get("/:id", addLastVisitedToSes, songsController.getASong);

export default songsRouter;