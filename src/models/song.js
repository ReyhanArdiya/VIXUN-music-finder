import mongoose from "mongoose";

const nothingFound = (field, fieldArg, caseSensitive) => {
	throw new Error(
		`Nothing found from {${field} : ${fieldArg}} case ${caseSensitive ? "" : "in"}sensitive query`
	);
};

/**
 * Type for instance of {@link Song}.
 *
 * @typedef {import("mongoose").Document & {
 * album: string
 * artist: string
 * coverURL: string
 * downloads: number
 * genre: string
 * isOnSale: boolean
 * priceUSD: number
 * title: string
 * year: number
 * }} SongDocument
 *
 *
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

class SongSchemaMethods {

	/**
	 * Returns the description of this {@link SongDocument}.
	 *
	 * @this {SongDocument}
	 *
	 * @returns {string}
	 */
	get desc() {
		return `[${this.genre}] ${this.title} - ${this.album} by ${this.artist} from ${this.year} is ${this.isOnSale ? "on sale" : "not on sale"} at $${this.priceUSD} and has ${this.downloads} downloads.`;
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

	/**
	 * Searches {@link SongDocument}s by its `album` field.
	 *
	 * @param {string} album
	 *
	 * @param {boolean} caseSensitive
	 *
	 * @this {Song}
	 *
	 * @returns {Promise<SongDocument>}
	 *
	 * @example
	 * ```
	 * await Song.findByAlbum("bloom", false);
	 * ```
	 */
	static async findByAlbum(album, caseSensitive = true) {
		const res = await this.find({
			album : {
				$options : `${caseSensitive ? "" : "i"}`,
				$regex   : album,
			}
		});

		return res.length ? res : nothingFound("album", album, caseSensitive);
	}

	/**
	 * Searches {@link SongDocument}s by its `artist` field.
	 *
	 * @param {string} artist
	 *
	 * @param {boolean} caseSensitive
	 *
	 * @returns {Promise<SongDocument>}
	 *
	 * @example
	 * ```
	 * await Song.findByArtist("BEACH housE", false);
	 * ```
	 */
	static async findByArtist(artist, caseSensitive = true) {
		const res = await this.find({
			artist : {
				$options : `${caseSensitive ? "" : "i"}`,
				$regex   : artist,
			}
		});

		return res.length ? res : nothingFound("artist", artist, caseSensitive);
	}

	/**
	 * Searches {@link SongDocument}s by its `genre` field.
	 *
	 * @param {string} genre
	 *
	 * @param {boolean} caseSensitive
	 *
	 * @returns {Promise<SongDocument>}
	 *
	 * @example
	 * ```
	 * await Song.findByGenre("Shoegaze");
	 * ```
	 */
	static async findByGenre(genre, caseSensitive = true) {
		const res = await this.find({
			genre : {
				$options : `${caseSensitive ? "" : "i"}`,
				$regex   : genre,
			}
		});

		return res.length ? res : nothingFound("genre", genre, caseSensitive);
	}

	/**
	 * Searches {@link SongDocument}s by its `isOnSale` field.
	 *
	 * @param {boolean} isOnSale
	 *
	 * @returns {Promise<SongDocument>}
	 *
	 * @example
	 * ```
	 * await Song.findBySaleStatus(false);
	 * ```
	 */
	static async findBySaleStatus(isOnSale) {
		const res = await this.find({ isOnSale });

		return res.length ? res : nothingFound("sale", isOnSale);
	}

	/**
	 * Searches {@link SongDocument}s by its `title` field.
	 *
	 * @param {string} title
	 *
	 * @param {boolean} caseSensitive
	 *
	 * @returns {Promise<SongDocument>}
	 *
	 * @example
	 * ```
	 * await Song.findByTitle("The Hours", true);
	 * ```
	 */
	static async findByTitle(title, caseSensitive = true) {
		const res = await this.find({
			title : {
				$options : `${caseSensitive ? "" : "i"}`,
				$regex   : title,
			}
		});

		return res.length ? res : nothingFound("title", title, caseSensitive);
	}

	/**
	 * Searches {@link SongDocument}s by its `links` field.
	 *
	 * @param {boolean | {
	 * spotify: boolean,
	 * deezer: boolean,
	 * appleMusic: boolean}} option
	 *
	 * @returns {Promise<SongDocument>}
	 *
	 * @example
	 * ```
	 * // Find songs where every link is not "not available"
	 * await Song.findByAlbum(true);
	 *
	 * // Find songs where every link is "not available"
	 * await Song.findByAlbum(false);
	 *
	 * // Find songs where appleMusic & deezer link is "not available" and
	 * // spotify link is available
	 * await Song.findByAlbum({
	 * 	appleMusic : false,
	 * 	spotify    : true
	 * });
	 * ```
	 */
	static async findByLinksAvailability(option) {
		// eslint-disable-next-line
		option.toString = function() {
		   return `{appleMusic : ${this.appleMusic}, deezer : ${this.deezer}, spotify : ${this.spotify}`;
		};
		let res;

		if (typeof option === "object") {
			const { appleMusic, deezer, spotify } = option;
			res = await this.find({
				"links.appleMusic" : { $regex : appleMusic ? /^(?!not available$).*$/ : /^not available$/ },
				"links.deezer"     : { $regex : deezer ? /^(?!not available$).*$/ : /^not available$/ },
				"links.spotify"    : { $regex : spotify ? /^(?!not available$).*$/ : /^not available$/ }
			});
		} else {
			res = await this.find({
				"links.appleMusic" : { $regex : option ? /^(?!not available$).*$/ : /^not available$/ },
				"links.deezer"     : { $regex : option ? /^(?!not available$).*$/ : /^not available$/ },
				"links.spotify"    : { $regex : option ? /^(?!not available$).*$/ : /^not available$/ }
			});
		}

		return res.length ? res : nothingFound("option", option);
	}
}

SongSchema.loadClass(SongSchemaMethods);
export const Song = mongoose.model("Song", SongSchema);

export default Song;