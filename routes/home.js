import { dirname, join } from "path";

/**
 *
 * @param {import("express").Express} app
 *
 * @example
 */
export default app => {
	app.get("/", (req, res) => {
		res.render("index");
	});

	app.get("/public/:dir/:file", (req, res) => {
		const { dir, file } = req.params;
		const pathToPublic = join(dirname, "..", "public", dir, file);
		res.sendFile(pathToPublic);
	});
};

