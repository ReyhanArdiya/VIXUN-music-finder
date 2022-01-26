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
		const count = await Song.estimatedDocumentCount();
		const randomArt = Math.floor(Math.random() * (count - 29));
		const artistsCol = await Song.find()
			                       .skip(randomArt)
			                       .limit(30);
		const artists = artistsCol.filter((artist, currentI, arr) => {
			const foundI = arr.findIndex(a => a.artist === artist.artist);

			return currentI === foundI;
		});

		res.render("home", { artists });
	} catch (err) {
		next(err);
	}
});

export default homeRouter;
