import { config } from "dotenv";
import express from "express";
const homeRouter = express.Router();
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path : join(__dirname, "..", "..", "process.env") });

/**
 *
 */
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

homeRouter.get("/", (req, res) => {
	const navbarLink = {
		browse  : "#display-browse",
		topHits : "#display-top-hits"
	};

	res.render("home", {
		SEARCH_LINK : process.env.SEARCH_LINK,
		categoryIcons,
		navbarLink
	});
});

export default homeRouter;
