import User from "../models/user.js";
import express from "express";

const authRouter = express.Router({ mergeParams : true });

authRouter.use(express.urlencoded({ extended : true }));

authRouter.route("/")
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

export default authRouter;