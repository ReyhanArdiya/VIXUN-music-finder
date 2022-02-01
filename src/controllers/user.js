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

	} catch (err) {
		next(err);
	}
};

const userController = {
	addFavorite,
	renderHome,
};

export default userController;