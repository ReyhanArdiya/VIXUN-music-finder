import "dotenv/config";
import User from "./models/user.js";
import authRouter from "./routers/auth.js";
import ejsEngine from "ejs-mate";
import errHandlers from "./utils/error-handlers.js";
import express from "express";
import { fileURLToPath } from "url";
import flash from "connect-flash";
import homeRouter from "./routers/home.js";
import methodOverride from "method-override";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import songsRouter from "./routers/songs.js";
import userRouter from "./routers/user.js";
import { addLocalVariables, requestLogger } from "./utils/middleware.js";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
	cookie : {
		httpOnly : true,
		// secure: true,
		maxAge   : 1000 * 60 * 60 * 24 * 7,
	},
	name              : process.env.SESSION_NAME || "connect.sid",
	resave            : false,
	saveUninitialized : true,
	secret            : process.env.SESSION_SECRET,
}));
app.use(methodOverride("_method"));
app.use(flash());

// Passport stuff
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Setup app middlewares
app.use(
	addLocalVariables,
	requestLogger
);

// Using routers
app.use("/", homeRouter);
app.use("/songs", songsRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);

// Error handlers
app.all("*", errHandlers.handleNotFound);

app.use(
	errHandlers.handleSameUser,
	errHandlers.handleCastError,
	errHandlers.handleAnyError
);

app.listen(port, () => console.log(`Listening on 🚢 ${port} (●'◡'●)`));

// TODO make basic express project template once all is set
