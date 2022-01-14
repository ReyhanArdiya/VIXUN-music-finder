import mongoose from "mongoose";

const nothingFound = (field, fieldArg, caseSensitive) => {
	throw new Error(
		`Nothing found from {${field} : ${fieldArg}} case ${caseSensitive ? "" : "in"}sensitive query`
	);
};

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
	 * @param album
	 *
	 * @param caseSensitive
	 *
	 * @this {Song}
	 *
	 * @example
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
	 * @param artist
	 *
	 * @param caseSensitive
	 *
	 * @example
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
	 * @param genre
	 *
	 * @param caseSensitive
	 *
	 * @example
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
	 * @param isOnSale
	 *
	 * @example
	 */
	static async findBySale(isOnSale) {
		const res = await this.find({ isOnSale });

		return res.length ? res : nothingFound("sale", isOnSale);
	}

	/**
	 *
	 * @param title
	 *
	 * @param caseSensitive
	 *
	 * @example
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
	 * @param {boolean | {
	 * spotify: boolean,
	 * deezer: boolean,
	 * appleMusic: boolean}} option Meow.
	 *
	 * @param caseSensitive
	 *
	 * @example
	 *
	 * @returns
	 */
	static async findByLinksAvailability(option, caseSensitive = true) {
		// eslint-disable-next-line
		option.toString = function() {
		   return `{appleMusic : ${this.appleMusic}, deezer : ${this.deezer}, spotify : ${this.spotify}`;
		};
		let res;

		if (typeof option === "object") {
			const { appleMusic, deezer, spotify } = option;
			res = await this.find({
				"links.appleMusic" : {
					$options : `${caseSensitive ? "" : "i"}`,
					$regex   : appleMusic ? /^(?!not available$).*$/ : /^not available$/,
				},
				"links.deezer" : {
					$options : `${caseSensitive ? "" : "i"}`,
					$regex   : deezer ? /^(?!not available$).*$/ : /^not available$/,
				},
				"links.spotify" : {
					$options : `${caseSensitive ? "" : "i"}`,
					$regex   : spotify ? /^(?!not available$).*$/ : /^not available$/,
				}
			});
		} else {
			res = await this.find({
				"links.appleMusic" : {
					$options : `${caseSensitive ? "" : "i"}`,
					$regex   : option ? /^(?!not available$).*$/ : /^not available$/,
				},
				"links.deezer" : {
					$options : `${caseSensitive ? "" : "i"}`,
					$regex   : option ? /^(?!not available$).*$/ : /^not available$/,
				},
				"links.spotify" : {
					$options : `${caseSensitive ? "" : "i"}`,
					$regex   : option ? /^(?!not available$).*$/ : /^not available$/,
				}
			});
		}

		return res.length ? res : nothingFound("option", option, caseSensitive);
	}
}

SongSchema.loadClass(SongMethods);
export const Song = mongoose.model("Song", SongSchema);

export default Song;