const path = require("path");

/**
 *
 * @param {import("express").Express} app
 *
 * @example
 */
module.exports = app => {
	app.get("/", (req, res) => {
		res.render("index");
	});

	app.get("/public/:dir/:file", (req, res) => {
		const { dir, file } = req.params;
		const pathToPublic = path.join(__dirname, "..", "public", dir, file);
		res.sendFile(pathToPublic);
	});
};