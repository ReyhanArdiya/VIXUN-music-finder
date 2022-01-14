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
const SongSchema = new mongoose.Schema({
	album : {
		required : true,
		type     : String,
	},
	artist : {
		required : true,
		type     : String,
	},
	coverURL : {
		required : true,
		type     : String,
	},
	downloads : {
		default : 0,
		type    : Number,
	},
	genre : {
		required : true,
		type     : String,
	},
	isOnSale : {
		default : false,
		type    : Boolean,
	},
	links : {
		appleMusic : {
			default : "not available",
			type    : String,
		},
		deezer : {
			default : "not available",
			type    : String,
		},
		spotify : {
			default : "not available",
			type    : String,
		},
	},
	priceUSD : {
		required : true,
		type     : Number,
	},
	title : {
		required : true,
		type     : String,
	},
	year : {
		required : true,
		type     : Number,
	}
}, { strict : "throw" });

class SongMethods {

	/**
	 * Returns the description of this `SongDocument`.
	 *
	 * @this {SongDocument}
	 *
	 * @returns {void}
	 */
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