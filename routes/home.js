import { fileURLToPath } from "url";
import { dirname, join } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// CMT put get and set and etc in here too
/**
 * Call this function to set all `app` routes for the homepage.
 *
 * @param {import("express").Express} app The express `app`.
 *
 * @example
 * ```
 * import routesHome from "./routes/home.js";
 * // Set the routes for homepage
 * routesHome(app);
 * ```
 */
export default app => {

	// Route to the home page
	app.get("/", (req, res) => {
		res.render("home");
	});

	// Route to get files from common folder
	app.get("/public/common/:dir/:file", (req, res) => {
		const { dir, file } = req.params;

		res.sendFile(join(__dirname, "..", "public", "common", dir, file));
	});

	// Route to get files from any page specific folders
	app.get("/public/:pageDir/:styleOrScripts/:file", (req, res) => {
		const { pageDir, styleOrScripts, file } = req.params;

		res.sendFile(join(
			__dirname,
			"..",
			"public",
			pageDir,
			styleOrScripts
			, file
		));
	});
};

