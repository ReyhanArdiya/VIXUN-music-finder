import "./database/vixunDB.js";
import { config } from "dotenv";
import express from "express";
import { fileURLToPath } from "url";
import homeRouter from "./routers/home.js";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path : join(__dirname, "..", "node.env") });

const port = process.env.PORT;
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

app.use("/", homeRouter);

app.listen(port, () => console.log(`Listening on 🚢 ${port} (●'◡'●)`));

// TODO make basic express project template once all is set