import mongoose from "mongoose";

/**
 * Type for instance of {@link Song}.
 *
 * @typedef {object} SongDocument
 *
 * @property {string} album
 *
 * @property {string} artist
 *
 * @property {string} coverURL
 *
 * @property {number} downloads
 *
 * @property {string} genre
 *
 * @property {boolean} isOnSale
 *
 * @property {number} priceUSD
 *
 * @property {string} title
 *
 * @property {number} year
 */
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
		spotify : {
			type    : String,
			default : "not available"
		},
		deezer : {
			type    : String,
			default : "not available"
		},
		amazonMusic : {
			type    : String,
			default : "not available"
		},
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
	},
	downloads : {
		type    : Number,
		default : 0
	},
}, { strict : "throw" });

class SongMethods {

	get desc() {
		return `[${this.genre}] ${this.title} - ${this.album} by ` +
		`${this.artist} from ` +
		`${this.year} is ${this.isOnSale ? "on sale" : "not on sale"} at ` +
		`$${this.priceUSD} and has ${this.downloads} downloads.`;
	}

	/**
	 * Increments a `Song` `downloads` property by one and returns the
	 * current `downloads` value.
	 *
	 * @returns {number} The current `downloads` value.
	 *
	 * @example
	 * ```
	 * new Song().addDownloads();
	 * ```
	 */
	addDownloads() {
		this.downloads++;

		return this._downloads;
	}
}

songSchema.loadClass(SongMethods);

export const Song = mongoose.model("Song", songSchema);

export default Song;