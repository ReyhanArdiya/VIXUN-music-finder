import Song from "../models/song.js";
import { config } from "dotenv";
import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path : join(__dirname, "..", "..", "process.env") });

const homeRouter = express.Router();

homeRouter.get("/", async (req, res, next) => {
	try {
		const navbarLink = {
			browse  : "#display-browse",
			topHits : "#display-top-hits"
		};

		const count = await Song.estimatedDocumentCount();
		const random = Math.floor(Math.random() * count);
		const songs = await Song.find()
			                     .skip(random)
			                     .limit(15);
		const artists = new Set(songs.map(song => song.artistImage));

		res.render("home", {
			DOMAIN : process.env.DOMAIN,
			artists,
			navbarLink,
			songs
		});
	} catch (err) {
		next(err);
	}
});

export default homeRouter;
