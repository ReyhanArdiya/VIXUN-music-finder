import User from "../models/user.js";

const renderHome = async (req, res) => {
	const user = await User.findById(req.params.id);
	res.render("user");
};

const userController = { renderHome };

export default userController;