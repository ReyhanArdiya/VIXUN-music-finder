import Song from "../models/song.js";
import { aggregatorAPIs } from "../request-songs/song-aggregator/index.js";
import express from "express";
import requestSongs from "../request-songs/index.js";

const songsRouter = express.Router();
songsRouter.use(express.urlencoded({ extended : true }));

songsRouter.get("/", async (req, res, next) => {
	try {
		let songs;
		if (req.query.q) {
			songs = await requestSongs(req.query.q);
		} else {
			const count = await Song.estimatedDocumentCount();
			const random = Math.floor(Math.random() * (count - 14));
			songs = await Song.find()
			                     .skip(random)
			                     .limit(15);
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

// TODO use content type. Find a way to detect content type from req
songsRouter.get("/:id", async (req, res, next) => {
	try {
		console.log(req.headers);
		res.render("song");
	} catch (err) {
		next(err);
	}
});

songsRouter.use((err, req, res) => {
	res.status(500).send("Error! :(");
});

export default songsRouter;