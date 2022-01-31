import User from "../models/user.js";

const renderRegister = (req, res) => {
	res.render("auth/register");
};

const renderLogin = (req, res) => {
	res.render("auth/login");
};

const registerUser = async (req, res, next) => {
	try {
		const { email, username, password } = req.body;
		const user = new User({
			email,
			username,
		});
		const newUser = await User.register(user, password);
		req.login(newUser, err => err && console.error(err));
		res.redirect("/");
	} catch (err) {
		next(err);
	}
};

const logout = (req, res) => {
	req.logout();
	res.redirect("/");
};

const authController = {
	logout,
	registerUser,
	renderLogin,
	renderRegister
};

export default authController;