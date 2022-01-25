import Song from "../models/song.js";
import { aggregatorAPIs } from "../database/song-aggregator/index.js";
import express from "express";
import requestSongs from "../database/index.js";

const songsRouter = express.Router();
songsRouter.use(express.urlencoded({ extended : true }));

songsRouter.get("/", async (req, res, next) => {
	try {
		let songs;
		if (req.query.q) {
			songs = await requestSongs(req.query.q);
		} else {
			const count = await Song.estimatedDocumentCount();
			const random = Math.floor(Math.random() * count);
			songs = await Song.find()
			                     .skip(random)
			                     .limit(10);
		}
		res.send(songs);
	} catch (err) {
		next(err);
	}
});

songsRouter.get("/top", async (req, res, next) => {
	try {
		const topSongs = await aggregatorAPIs.deezer.searchDeezerChart("/");
		res.send(topSongs);
	} catch (err) {
		next(err);
	}
});

songsRouter.use((err, req, res) => {
	res.status(500).send("Error! :(");
});

export default songsRouter;