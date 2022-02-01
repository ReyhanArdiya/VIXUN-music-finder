import express from "express";
import userController from "../controllers/user.js";

const favoriteRouter = express.Router({ mergeParams : true });

favoriteRouter.post("/", userController.addFavorite);

export default favoriteRouter;