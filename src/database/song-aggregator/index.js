import amazonMusic from "./amazon-music.js";
import deezer from "./deezer.js";
import spotify from "./spotify.js";

/**
 * An aggregator that will search using {@link deezer.searchDeezer}, {@link spotify.searchSpotify}
 * and {@link amazonMusic.scrapeAmazonMusic} then aggregates their data into one
 * mainly following `SongSchema` except for `price` property.
 *
 * @param {string} q
 * A query string to search for in deezer API and spotify API. It is recommended
 * that the format is `"${trackTitle} ${artist}" for a more specific search result.
 *
 * @param {import("puppeteer").Page} page
 * A `puppeteer.Page`.
 *
 * @param {"priceCardsContainer" | "singleSongContainer"} amazonPriceContaineSelector
 * Argument to be passed to `priceContainerSelector` of {@link amazonMusic.scrapeAmazonMusic}.
 *
 * @param {import("./amazon-music").ScrapeAmazonMusicOptions} scrapeAmazonMusicOptions
 * Argument to be passed to `options` of {@link amazonMusic.scrapeAmazonMusic}.
 *
 * @returns A promise that resolves into {@link aggregatedData}.
 *
 * @example
 * ```js
 * const browser = await puppeteer.launch({ headless : false });
 * const page = await browser.newPage();
 * console.log(await aggregator("the hours beach house", page, "priceCardsContainer"));
 * console.log(await aggregator("oh no oh yes akina nakamori", page, "priceCardsContainer"));
 * ```
 */
const songAggregator = async (
	q,
	page,
	amazonPriceContaineSelector,
	scrapeAmazonMusicOptions = {}
) => {
	/*  eslint-disable jsdoc/require-jsdoc */
	const aggregatedData = {
		album     : null,
		artist    : null,
		externals : {},
		image     : null,
		price     : null,
		release   : null,
		title     : null
	};

	try {
		const spotifyTrackRes = await spotify.searchSpotify(
			await spotify.getSpotifyToken(),
			q,
			[ "track" ]
		);
		const spotifyTrackExt = spotify.extractSpotify(
			spotifyTrackRes.tracks.items[0]
		);
		const spotifyAlbumExt = spotify.extractSpotify(
			spotifyTrackRes.tracks.items[0].album
		);
		aggregatedData.album = spotifyTrackExt.album;
		aggregatedData.artist = spotifyTrackExt.artist;
		aggregatedData.image = spotifyAlbumExt.image;
		aggregatedData.release = spotifyAlbumExt.release;
		aggregatedData.title = spotifyTrackExt.name;
		aggregatedData.externals.spotify = {
			id      : spotifyTrackExt.id,
			link    : spotifyTrackExt.link,
			preview : spotifyTrackExt.preview
		};
	} catch (err) { /* nothing */ }

	try {
		const deezerTrackRes = await deezer.searchDeezer(q);
		const deezerTrackExt = deezer.extractDeezer(deezerTrackRes[0]);
		const deezerAlbumExt = deezer.extractDeezer(deezerTrackRes[0].album);
		aggregatedData.album ||= deezerTrackExt.album;
		aggregatedData.artist ||= deezerTrackExt.artist;
		aggregatedData.image ||= deezerAlbumExt.image;
		aggregatedData.title ||= deezerTrackExt.title;
		aggregatedData.externals.deezer = {
			id      : deezerTrackExt.id,
			link    : deezerTrackExt.link,
			preview : deezerTrackExt.preview
		};
		if (aggregatedData.album) {
			const deezerAlbumRes = await deezer.searchDeezer(
				`${aggregatedData.album} ${aggregatedData.artist}`,
				"/album"
			);
			aggregatedData.image =
                deezer.extractDeezer(deezerAlbumRes[0]).image;
		}
	} catch (err) { /* nothing */ }

	try {
		const amazonQuery = `${aggregatedData.album || aggregatedData.title}`;

		// Replace the parens to url encoded stuff
		const replaceLeftParen = amazonQuery.replaceAll("(", "%28");
		const replaceRightParen = replaceLeftParen.replaceAll(")", "%29");
		const amazonMusicRes = await amazonMusic.scrapeAmazonMusic(
			page,
			replaceRightParen,
			aggregatedData.artist,
			amazonPriceContaineSelector,
			scrapeAmazonMusicOptions
		);
		aggregatedData.externals.amazonMusic = { link : amazonMusicRes.link };
		aggregatedData.price = amazonMusicRes.foundPrices;
	} catch (err) { /* nothing */ }

	return aggregatedData;
};

// DBG some aggregator tests
// import puppeteer from "puppeteer";
// const browser = await puppeteer.launch({ headless : true });
// const page = await browser.newPage();

// console.log(await songAggregator("Oh No, Oh Yes! Akina Nakamori", page, "priceCardsContainer"));
// console.log(await songAggregator("the hours beach house", page, "priceCardsContainer"));
// console.log(await songAggregator("summerboy lady gaga", page, "priceCardsContainer"));
// console.log(await songAggregator("911 lady gaga", page, "priceCardsContainer"));
// console.log(await songAggregator("sour candy lady gaga", page, "priceCardsContainer"));
// console.log(await songAggregator("baka mitai", page, "singleSongContainer"));
// console.log(await songAggregator("bloody marry lady gaga", page, "priceCardsContainer"));
// console.log(await songAggregator("used to be beach house", page, "priceCardsContainer"));

export default songAggregator;