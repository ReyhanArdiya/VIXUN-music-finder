import User from "../models/user.js";
import express from "express";
import passport from "passport";

const authRouter = express.Router({ mergeParams : true });

authRouter.use(express.urlencoded({ extended : true }));

authRouter.route("/register")
	.get((req, res) => {
		res.render("auth/register");
	})
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

authRouter.route("/login")
	.get((req, res) => {
		res.render("auth/login");
	}).post(passport.authenticate("local", {
		failureRedirect : "/auth/login",
		successRedirect : "/"
	}));

authRouter.post("/logout", (req, res) => {
	req.logout();
	res.redirect("/");
});

export default authRouter;