import Song from "../models/song.js";
import { aggregatorAPIs } from "../request-songs/song-aggregator/index.js";
import requestSongs from "../request-songs/index.js";

const index = async (req, res, next) => {
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
};

const sendTopHits = async (req, res, next) => {
	try {
		const topSongs = await aggregatorAPIs.deezer.searchDeezerChart("/");
		res.send(topSongs);
	} catch (err) {
		next(err);
	}
};

const getASong = async (req, res, next) => {
	const { headers: { accept }, params: { id } } = req;
	try {
		const song = await Song.findById(id).populate({
			path     : "comments",
			populate : { path : "user" }
		});

		if (accept === "application/json") {
			res.send(song);
		} else {
			res.render("song", { song });
		}
	} catch (err) {
		next(err);
	}
};

const songsController = {
	getASong,
	index,
	sendTopHits
};

export default songsController;