import Song from "../../models/song.js";
import amazonMusic from "./amazon-music.js";
import deezer from "./deezer.js";
import puppeteer from "puppeteer";
import randomUseragent from "random-useragent";
import spotify from "./spotify.js";

/**
 * Helps you make a new `puppeteer.Page` and randomize its user agent.
 *
 * @param {import("puppeteer").Browser} browser
 *
 * @param {boolean} randomizeAgent
 *
 * @returns {Promise<import("puppeteer").Page>}
 * A promise that resolves to `page`.
 *
 * @example
 * ```
 *
 * ```
 */
const makeNewPage = async (browser, randomizeAgent = true) => {
	const newPage = await browser.newPage();
	if (randomizeAgent) {
		const userAgent = randomUseragent.getRandom(val => val.browserName === "Chrome" && val.osName === "Windows");
		newPage.setUserAgent(userAgent);
	}

	return newPage;
};
export const aggregatorAPIs = {
	amazonMusic,
	deezer,
	spotify
};

export default aggregator;