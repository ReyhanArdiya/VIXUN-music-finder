import express from "express";
import { fileURLToPath } from "url";
import routerHome from "./routes/home.js";
import vixunDB from "./vixunDB";
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
	next();
});

app.use("/", routerHome);


app.listen(port, () => console.log(`Listening on 🚢 ${port} (●'◡'●)`));

// TODO make basic express project template once all is set

