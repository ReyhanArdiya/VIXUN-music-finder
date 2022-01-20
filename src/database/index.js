import Song from "../models/song.js";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path : join(__dirname, "..", "..", "process.env") });

const mongoDatabase = process.env.MONGODB;
try {
	await mongoose.connect(`mongodb://localhost:27017/${mongoDatabase}`);
	console.log(`Connected to ${mongoDatabase}!🍃`);
} catch (err) {
	console.log(`Error! Can't connect to ${mongoDatabase}!🍂`, err);
}

// try {
// 	console.log(await Song.findByLinksAvailability({
// 		deezer     : false,
// 		spotify    : true
// 	}));
// } catch (error) {
// 	console.log(error);
// }

// mongoose.connection.close();
