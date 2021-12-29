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

};

