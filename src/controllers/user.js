import Song from "../models/song.js";
import User from "../models/user.js";

const renderHome = async (req, res) => {
	const { comments, favorites } = await User.findById(req.user._id)
		.populate("favorites")
		.populate({
			path     : "comments",
			populate : { path : "song" }
		});

	res.render("user", {
		comments,
		favorites
	});
};

const addFavorite = async (req, res, next) => {
	try {
		const { id } = req.params;
		const song = await Song.findById(id);
		await User.findByIdAndUpdate(
			req.user._id,
			{ $addToSet : { favorites : song } }
		);
		res.end();
	} catch (err) {
		next(err);
	}
};

const deleteFavorite = async (req, res, next) => {
	try {
		const { id } = req.params;
		console.log(await User.findByIdAndUpdate(
			req.user._id,
			{ $pull : { favorites : id } },
			{ new : true }
		));
		res.end();
	} catch (err) {
		next(err);
	}
};

const userController = {
	addFavorite,
	deleteFavorite,
	renderHome,
};

export default userController;