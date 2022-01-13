import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
	album : {
		type     : String,
		required : true
	},
	artist : {
		type     : String,
		required : true
	},
	coverURL : {
		type     : String,
		required : true
	},
	genre : {
		type     : String,
		required : true
	},
	isOnSale : {
		type    : Boolean,
		default : false
	},
	links : {
		spotify     : String,
		deezer      : String,
		amazonMusic : String,
	},
	priceUSD : {
		type     : Number,
		required : true
	},
	title : {
		type     : String,
		required : true
	},
	year : {
		type     : Number,
		required : true
	}
});

export const Song = mongoose.model("Song", songSchema);

export default Song;