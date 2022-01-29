import User from "../models/user.js";
import express from "express";

const authRouter = express.Router({ mergeParams : true });

authRouter.use(express.urlencoded({ extended : true }));

/*
POST http://localhost:9000/auth
Content-Type: application/x-www-form-urlencoded

email=elys@gmail.com
&username=elys
&password=elys
*/
authRouter.post("/", async (req, res, next) => {
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

authRouter.get("/register", (req, res) => {
	res.render("auth/register");
});

authRouter.get("/login", (req, res) => {
	res.render("auth/login");
});

export default authRouter;