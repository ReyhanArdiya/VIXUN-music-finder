import mongoose from "mongoose";
import Song from "./models/song.js";

const mongoDatabase = "VIXUNDB";
try {
	await mongoose.connect(`mongodb://localhost:27017/${mongoDatabase}`);
	console.log(`Connected to ${mongoDatabase}!🍃`);
} catch (err) {
	console.log(`Error! Can't connect to ${mongoDatabase}!🍂`, err);
}


