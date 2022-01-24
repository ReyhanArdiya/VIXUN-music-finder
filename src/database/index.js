import Song from "../models/song.js";
import aggregateAndSave from "./utils/aggregate-save.js";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import newPageRandomUA from "./utils/user-agent.js";
import puppeteer from "puppeteer";
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

const browser = await puppeteer.launch();

/**
 * This function will aggregate the song's data found from querying `q` and
 * saves it to the DB if no duplicate was detected. Whether this function saves
 * the found song or not, it will always return an array of song documents from
 * the results of querying using `q`.
 *
 * @param {string} q
 * A flexible case insensitive string that will be used when aggregating
 * the song's data and querying the song database. Examples:
 * 1. "The hours beach house bloom"
 * 2. "song depression space beach cherry house"
 * 3. "CHROM gAgA lAd 11 bOy suMMer"
 *
 * @param {import("puppeteer").Page} page
 * An optional `puppeteer.Page`. If omitted it will use this module's own page.
 * This function will close the `page` at the end.
 *
 * @returns A promise that resolves into the results of querying the database
 * sorted from the most relevant results.
 *
 * @example
 * Only save this new song if the entry doesn't exist in the database. Whether
 * it was saved or not, this function will always return the results of
 * the query.
 * ```js
 * console.log(await requestSongs("the hours beach house bloom"));
 * ```
 */
const requestSongs = async (q, page) => {
	page ??= await newPageRandomUA(browser);
	await aggregateAndSave(q, page);

	return await Song.querySongs(q);
};

export default requestSongs;

// DBG some requestSongs tests
// console.log(await requestSongs("The hours beach house bloom"));
// console.log(await requestSongs("song depression space beach cherry house"));
// console.log(await requestSongs("CHROM gAgA lAd 11 bOy suMMer"));