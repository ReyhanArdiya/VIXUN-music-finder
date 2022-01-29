import User from "../models/user.js";
import express from "express";

const usersRouter = express.Router({ mergeParams : true });

usersRouter.use(express.urlencoded({ extended : true }));

usersRouter.route("/")
	.post(async (req, res, next) => {
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
	});

export default usersRouter;