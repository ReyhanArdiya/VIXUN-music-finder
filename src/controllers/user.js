import Song from "../models/song.js";
import User from "../models/user.js";

const renderHome = async (req, res) => {
	const { comments } = await User.findById(req.user._id).populate({
		path     : "comments",
		populate : { path : "song" }
	});
	res.render("user", { comments });
};

const addFavorite = async (req, res, next) => {
	try {
		const { id } = req.params;
		const song = await Song.findById(id);
		await User.findByIdAndUpdate(
			req.user._id,
			{ $addToSet : { favorites : song } },
			{ new : true }
		);
		res.end();
	} catch (err) {
		next(err);
	}
};

const userController = {
	addFavorite,
	renderHome,
};

export default userController;