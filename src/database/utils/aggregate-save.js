import Song from "../../models/song.js";
import songAggregator from "../song-aggregator/index.js";

/**
 * Uses {@link songAggregator} data to make, then save a new {@link Song} document.
 *
 * @param {string} q
 * A query string to search for using deezer API and spotify API. It is recommended
 * that the format is `"${trackTitle} ${artist}" for a more specific search result.
 *
 * @param {import("puppeteer").Page} page
 * A `puppeteer.Page`.
 *
 * @param {import("./amazon-music").ScrapeAmazonMusicOptions} scrapeAmazonMusicOptions
 * Argument to be passed to `options` of {@link amazonMusic.scrapeAmazonMusic}.
 *
 * @returns {false | Promise<import("../../models/song.js").SongDocument>}
 * A promise that either resolves into `false` if duplicate song already exists
 * in {@link Song} model or the new {@link Song} document if it was
 * successfully saved.
 *
 * @example
 * ```js
 * const browser = await puppeteer.launch({ headless : false });
 * const page = await browser.newPage();
 * console.log(await aggregateAndSave("The hours beach house", page));
 * ```
 */
const aggregateAndSave = async (
	q,
	page,
	scrapeAmazonMusicOptions = {}
) => {
	const songData = await songAggregator(q, page, scrapeAmazonMusicOptions);
	const newSong = new Song(songData);

	const { album, artist, title } = newSong;
	const duplicateSong = await Song.findOne({
		album,
		artist,
		title
	});

	return duplicateSong ? false : await newSong.save();
};

export default aggregateAndSave;

// DBG some aggregateAndSave test
// import { config } from "dotenv";
// import { fileURLToPath } from "url";
// import mongoose from "mongoose";
// import { dirname, join } from "path";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// config({ path : join(__dirname, "..", "..", "..", "process.env") });

// const mongoDatabase = process.env.MONGODB;
// try {
// 	await mongoose.connect(`mongodb://localhost:27017/${mongoDatabase}`);
// 	console.log(`Connected to ${mongoDatabase}!🍃`);
// } catch (err) {
// 	console.log(`Error! Can't connect to ${mongoDatabase}!🍂`, err);
// }
// import puppeteer from "puppeteer";
// const browser = await puppeteer.launch({ headless : true });
// const page = await browser.newPage();
// console.log(await aggregateAndSave("Catallena orange CARAMEL", page));
// console.log(await aggregateAndSave("zavodila mike geno", page));
// console.log(await aggregateAndSave("theme from schindler's list", page));
// console.log(await aggregateAndSave("stay o WHEN", page));
// console.log(await aggregateAndSave("time deyaz", page));
// console.log(await aggregateAndSave("song from a secret garden", page));
// console.log(await aggregateAndSave("sacrifice weekend", page));
// console.log(await aggregateAndSave("release + fading orenji music", page));
// console.log(await aggregateAndSave("Oh No, Oh Yes! Akina Nakamori", page));
// console.log(await aggregateAndSave("the STEP BELOW hell", page));
// console.log(await aggregateAndSave("alejandro lady gaga", page));
// console.log(await aggregateAndSave("PPP beach house", page));
// console.log(await aggregateAndSave("depression cherry beach house", page));
// console.log(await aggregateAndSave("sour candy lady gaga", page));
// console.log(await aggregateAndSave("summerboy lady gaga", page));
// console.log(await aggregateAndSave("used to be beach house", page));
// console.log(await aggregateAndSave("abyss of decadence", page));
// console.log(await aggregateAndSave("Tell Me You Love Me bolbbalgan4", page));
// console.log(await aggregateAndSave("레옹 IU GOD G", page));
// console.log(await aggregateAndSave("baka mitai", page));
// console.log(await aggregateAndSave("bloody marry lady gaga", page));