import express from "express";
import { join } from "path";

const app = express();
app.set("view engine", "ejs");
app.set("views", join(__dirname, "/views"));

const port = 9000;

// Set the routes for homepage
// Set the routes for homepage
require("./routes/home")
	.default(app);

app.listen(port, () => console.log(`Listening on port ${port}`));
