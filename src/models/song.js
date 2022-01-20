/*  eslint-disable jsdoc/require-returns-description*/
import mongoose from "mongoose";

// eslint-disable-next-line
const nothingFound = (field, fieldArg, caseSensitive) => {
	throw new Error(
		`Nothing found from {${field} : ${fieldArg}} case ${caseSensitive ? "" : "in"}sensitive query`
	);
};

const SongExternalSchema = new mongoose.Schema({
	id      : String,
	link    : String,
	preview : String

}, {
	_id    : false,
	strict : "throw"
});

// TODO change the schema here when our model is 100% fixed
/**
 * Type for instance of {@link Song}.
 *
 * @typedef {import("mongoose").Document & {
 * album: string
 * artist: string
 * image: string
 * price: number
 * title: string
 * release: number
 * }} SongDocument
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
	externals : {
		amazon : {
			// eslint-disable-next-line
			default : {},
			type    : SongExternalSchema
		},
		deezer : {
			// eslint-disable-next-line
			default: {},
			type    : SongExternalSchema
		},
		spotify : {
			// eslint-disable-next-line
			default : {},
			type    : SongExternalSchema
		},
	},
	image : {
		required : true,
		type     : String,
	},
	price   : Number,
	release : {
		required : true,
		type     : Number,
	},
	title : {
		required : true,
		type     : String,
	},
}, { strict : "throw" });

/**
 *
 */
class SongSchemaMethods {

	/**
	 * Returns the description of this {@link SongDocument}.
	 *
	 * @this {SongDocument}
	 *
	 * @returns {string}
	 */
	get desc() {
		return `${this.title} - ${this.album} by ${this.artist} from ${this.release} ${"price" in this ? `costs ${this.price}` : ""}`;
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
	 * deezer: boolean}} option
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
	 * // Find songs where deezer link is "not available" and spotify is
	 * // available.
	 * await Song.findByAlbum({
	 * 	spotify    : true
	 * });
	 * ```
	 */
	static async findByLinksAvailability(option) {

		// TODO gotta refactor this too since i moved the links to externals :D
		// eslint-disable-next-line
		option.toString = function() {
		   return `{deezer : ${this.deezer}, spotify : ${this.spotify}`;
		};
		let res;

		if (typeof option === "object") {
			const { deezer, spotify } = option;
			res = await this.find({
				"links.deezer"  : { $regex : deezer ? /^(?!not available$).*$/ : /^not available$/ },
				"links.spotify" : { $regex : spotify ? /^(?!not available$).*$/ : /^not available$/ }
			});
		} else {
			res = await this.find({
				"links.deezer"  : { $regex : option ? /^(?!not available$).*$/ : /^not available$/ },
				"links.spotify" : { $regex : option ? /^(?!not available$).*$/ : /^not available$/ }
			});
		}

		return res.length ? res : nothingFound("option", option);
	}
}

SongSchema.loadClass(SongSchemaMethods);
export const Song = mongoose.model("Song", SongSchema);

export default Song;