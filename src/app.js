import User from "./models/user.js";
import { config } from "dotenv";
import ejsEngine from "ejs-mate";
import express from "express";
import { fileURLToPath } from "url";
import homeRouter from "./routers/home.js";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import songsRouter from "./routers/songs.js";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path : join(__dirname, "..", "process.env") });

// Mongoose stuff
const mongoDatabase = process.env.MONGODB;
try {
	await mongoose.connect(`mongodb://localhost:27017/${mongoDatabase}`);
	console.log(`Connected to ${mongoDatabase}!🍃`);
} catch (err) {
	console.log(`Error! Can't connect to ${mongoDatabase}!🍂`, err);
}

// Express stuff
const port = process.env.PORT;
const app = express();
app.set("view engine", "ejs");
app.engine("ejs", ejsEngine);
app.set("views", join(__dirname, "views"));

app.use(express.static(join(__dirname, "public")));
app.use(session({
	cookie            : { maxAge : 1000 * 60 * 60 * 24 * 7 },
	resave            : false,
	saveUninitialized : true,
	secret            : process.env.SESSION_SECRET,
}));

// Passport stuff
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
app.use("/songs", songsRouter);

app.listen(port, () => console.log(`Listening on 🚢 ${port} (●'◡'●)`));

// TODO make basic express project template once all is set