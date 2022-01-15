import Song from "../models/song.js";
import mongoose from "mongoose";

const mongoDatabase = "VIXUNDB";
try {
	await mongoose.connect(`mongodb://localhost:27017/${mongoDatabase}`);
	console.log(`Connected to ${mongoDatabase}!🍃`);
} catch (err) {
	console.log(`Error! Can't connect to ${mongoDatabase}!🍂`, err);
}

try {
	console.log(await Song.findByLinksAvailability({
		appleMusic : true,
		deezer     : false,
		spotify    : true
	}));
} catch (error) {
	console.log(error);
}

mongoose.connection.close();

/** @type {Element | null}*/
const abc = document.querySelector("#one");

abc.addEventListener();

