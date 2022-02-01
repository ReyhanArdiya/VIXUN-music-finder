import User from "../models/user.js";

const renderHome = async (req, res) => {
	res.render("user");
};

const userController = { renderHome };

export default userController;