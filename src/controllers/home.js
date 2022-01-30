import Song from "../models/song.js";

const render = async (req, res, next) => {
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
};

const homeController = { render };

export default homeController;