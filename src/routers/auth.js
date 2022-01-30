import authController from "../controllers/auth.js";
import express from "express";
import passport from "passport";

const authRouter = express.Router({ mergeParams : true });

authRouter.use(express.urlencoded({ extended : true }));

authRouter.route("/register")
	.get(authController.renderRegister)
	.post(authController.registerUser);

authRouter.route("/login")
	.get(authController.renderLogin)
	.post(passport.authenticate("local", {
		failureRedirect : "/auth/login",
		successRedirect : "/"
	}));

// TODO Add the logout button on the user's homepage
authRouter.post("/logout", authController.logout);

export default authRouter;