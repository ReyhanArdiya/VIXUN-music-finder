import express from "express";
import { fileURLToPath } from "url";
import fs from "fs";
import routesHome from "./routes/home.js";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = 9000;

const app = express();
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

app.use(express.static(join(__dirname, "public")));

// Request logger
app.use((req, res, next) => {
	const date = new Date();
	const log =
        "🌟 You got a new request! ( 🌸≧◡≦)~💌 \\(￣▽￣* )ゞ 🌟" +
        `⌚ ${date.toLocaleString()} ⌚`;
	console.log(log);
	fs.appendFile(join(__dirname, "request-log.txt"), `${log}\n`, err => {
		if (err) {
			throw err;
		}
		console.log("A new request has been logged! 📝");
	});
	next();
});

// Set the routes for homepage
routesHome(app);

app.listen(port, () => console.log(`Listening on port ${port}`));

// TODO make basic express project template once all is set
