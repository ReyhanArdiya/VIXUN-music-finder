import express from "express";
const routerHome = express.Router();

routerHome.get("/", (req, res) => {
	res.render("home");
});

export default routerHome;
