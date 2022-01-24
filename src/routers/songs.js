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
			songs = await Song.find().limit(10);
		}
		res.send(songs);
	} catch (err) {
		next(err);
	}
});

songsRouter.get("/top", async (req, res, next) => {
	try {
		const topSongs = await aggregatorAPIs.deezer.searchDeezerChart("/tracks");
		res.send(topSongs);
	} catch (err) {
		next(err);
	}
});

export default songsRouter;