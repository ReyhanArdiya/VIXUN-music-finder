import { config } from "dotenv";
import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import Song from "../models/song.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path : join(__dirname, "..", "..", "process.env") });

const homeRouter = express.Router();

class CategoryIcon {
	 constructor(label = "Type", imgURL = "https://placekitten.com/100/100") {

		// Change the label's casing
		if (label.length) {
			label = `${label[0].toUpperCase()}${label.slice(1)
				.toLowerCase()}`;
		}

		this.label = label;
		this.imgURL = imgURL;
	}
}
// TODO do i need to delete this? since my apis dont have ways to get the genre :(
const categoryIcons =
[
	new CategoryIcon("Pop", "https://placekitten.com/500/500"),
	new CategoryIcon("Shoegaze", "https://placekitten.com/400/400"),
	new CategoryIcon("Rock", "https://placekitten.com/300/300"),
	new CategoryIcon("Lo-Fi", "https://placekitten.com/200/200"),
	new CategoryIcon("Indie", "https://placekitten.com/100/100"),
	new CategoryIcon("Pop", "https://placekitten.com/500/500"),
	new CategoryIcon("Shoegaze", "https://placekitten.com/400/400"),
	new CategoryIcon("Rock", "https://placekitten.com/300/300"),
	new CategoryIcon("Lo-Fi", "https://placekitten.com/200/200"),
	new CategoryIcon("Indie", "https://placekitten.com/100/100"),
	new CategoryIcon("Pop", "https://placekitten.com/500/500"),
	new CategoryIcon("Shoegaze", "https://placekitten.com/400/400"),
	new CategoryIcon("Rock", "https://placekitten.com/300/300"),
	new CategoryIcon("Lo-Fi", "https://placekitten.com/200/200"),
	new CategoryIcon("Indie", "https://placekitten.com/100/100"),
];

homeRouter.get("/", async (req, res, next) => {
	try {
		const navbarLink = {
			browse  : "#display-browse",
			topHits : "#display-top-hits"
		};

		const count = await Song.estimatedDocumentCount();
		const random = Math.floor(Math.random() * count);
		const songs = await Song.find().skip(random).limit(15);

		res.render("home", {
			DOMAIN : process.env.DOMAIN,
			categoryIcons,
			navbarLink,
			songs
		});
	} catch (err) {
		next(err);
	}
});

export default homeRouter;
