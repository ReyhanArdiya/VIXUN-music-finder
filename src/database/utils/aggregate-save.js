import Song from "../models/song.js";
import songAggregator from "./song-aggregator/index.js";

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
 * @returns A promise that resolves into the new {@link Song} document.
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

	return await newSong.save();
};

export default aggregateAndSave;

// DBG some aggregateAndSave test
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
// console.log(await aggregateAndSave("911 lady gaga", page));
// console.log(await aggregateAndSave("the hours beach house", page));
// console.log(await aggregateAndSave("depression cherry beach house", page));
// console.log(await aggregateAndSave("sour candy lady gaga", page));
// console.log(await aggregateAndSave("summerboy lady gaga", page));
// console.log(await aggregateAndSave("used to be beach house", page));
// console.log(await aggregateAndSave("abyss of decadence", page));
// console.log(await aggregateAndSave("Tell Me You Love Me bolbbalgan4", page));
// console.log(await aggregateAndSave("레옹 IU GOD G", page));
// console.log(await aggregateAndSave("baka mitai", page));
// console.log(await aggregateAndSave("bloody marry lady gaga", page));