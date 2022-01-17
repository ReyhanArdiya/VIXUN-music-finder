import axios from "axios";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path : join(__dirname, "..", "..", "..", "process.env") });

/**
 * Returns a spotify token.
 *
 * @param {boolean} bearer
 * Set to `true` to return `"Bearer token"`, false to return `"token"` only.
 * Defaults to `true`.
 *
 * @returns {Promise<string>} `"Bearer token"` or `"token"`.
 *
 * @example
 * ```
 * await searchSpotify(await getSpotifyToken(), "The Hours");
 * ```
 */
const getSpotifyToken = async (bearer = true) => {
	const res = await axios("https://accounts.spotify.com/api/token", {
		headers : {
			Authorization : `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`)
				.toString("base64")}`,
			"Content-Type" : "application/x-www-form-urlencoded"
		},
		method : "POST",
		params : { "grant_type" : "client_credentials" }
	});

	return bearer ? `Bearer ${res.data["access_token"]}` : res.data["access_token"];
};

/**
 * Search using Spotify's `/search` endpoint.
 *
 * @param {string} token
 * String of spotify's token using the `"Bearer token"` format. Use
 * {@link getSpotifyToken} to easily get `token`.
 *
 * @param {string} q The query string to search for.
 *
 * @param {string[]} type
 * Strings of what type of resources to search from spotify, [read more here](https://developer.spotify.com/documentation/web-api/reference/#/operations/search).
 * Defaults to [ "track", "album", "artist" ].
 *
 * @param {number} limit
 * Number of results to receive. Defaults to 1.
 *
 * @returns {Promise<import("axios").AxiosResponse> | Error} The `AxiosResponse`
 * or an `Error`.
 *
 * @example
 * ```
 * await searchSpotify(await getSpotifyToken(), "The Hours")
 * ```
 */
const searchSpotify = async (
	token,
	q,
	type = [ "track", "album", "artist" ],
	limit = 1
) => {
	type = type.join(",");

	const res = await axios.get("https://api.spotify.com/v1/search", {
		headers : {
			Authorization  : token,
			"Content-Type" : "application/json"
		},
		params : {
			limit,
			q,
			type,
		}
	});

	return res;
};

/**
 * @param {object} data
 * One of these objects acquired from Spotify API's search endpoint or
 * {@link searchSpotify}:
 * 1. One element from `albums.items[]` or an `album` object.
 * 2. One element from `artists.items[]` or an `artist` object.
 * 3. One element from `tracks.item[]` or a `track` object.
 *
 * This functions checks the `data.type` property for what kind of object to
 * extract (`"album" | "artist" | "track"`).
 *
 * @returns
 *
 * @example
 */
const extractSpotify = data => {
	/* eslint-disable jsdoc/require-jsdoc */
	const extractAlbum = album => {
		const {
			id,
			name,
			type,
			uri,
			"external_urls": { spotify },
			"release_date": release,
			images: [ { url: image } ],
		} = album;

		return {
			id,
			image,
			name,
			release,
			spotify,
			type,
			uri,
		};
	};

	const extractArtist = artist => {
		const {
			id,
			name,
			type,
			uri,
			"external_urls": { spotify },
		} = artist;

		return {
			id,
			name,
			spotify,
			type,
			uri,
		};
	};

	const extractTrack = album => {
		const {
			id,
			name,
			type,
			uri,
			popularity,
			"external_urls": { spotify },
			"preview_url": preview,
			"track_number": trackNumber,
			"disc_number": discNumber
		} = album;

		return {
			discNumber,
			id,
			name,
			popularity,
			preview,
			spotify,
			trackNumber,
			type,
			uri
		};
	};

	switch (data.type) {
		case "album" :
			return extractAlbum(data);

		case "artist" :
			return extractArtist(data);

		case "track" :
			return extractTrack(data);

		default :
			return {};
	}
};

// DBG
// const res = await searchSpotify(await getSpotifyToken(), "Beach House", [ "artist" ]);
// console.log(extractSpotify(res.data.artists.items[0]));


const spotify = {
	extractSpotify,
	getSpotifyToken,
	searchSpotify
};

export default spotify;