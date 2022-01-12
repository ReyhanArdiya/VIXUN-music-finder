import mongoose from "mongoose";
import modelSong from "./models/song.js";

await mongoose.connect("mongodb://localhost:27017/VIXUNDB")
	.then(() => console.log("Connected!"))
	.catch(err => console.log("Error!", err));