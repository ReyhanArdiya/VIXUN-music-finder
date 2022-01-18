import axios from "axios";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path : join(__dirname, "..", "..", "..", "process.env") });

/**
 * Search using Deezer's [`/search` endpoint](https://developers.deezer.com/api/search).
 *
 * @param {string} q
 * A general query string that can aslo accept a combination of tracks,
 * artists and albums.
 *
 * @param {number} limit
 * The number of items to return. Defaults to `1`.
 *
 * @returns {Promise<object[]>}
 * A promise that resolves to an array containing results object.
 *
 * @example
 * ```
 * const res = await searchDeezer("The hours beach house"))[0]);
 * console.log(res);
 * ```
 */
const searchDeezer = async (q, limit = 1) => {
	const res = await axios.get("http://api.deezer.com/search", { params : { q } });

	return res.data.data.slice(0, limit);
};
