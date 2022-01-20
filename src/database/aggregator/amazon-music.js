import puppeteer from "puppeteer";

/*  eslint-disable */
const oldScraper = async () => {

	/**
	 * This function will either scrape the album's price or possible a single
	 * song's price based on what was found in Amazon Music, CDs & Vinyl category.
	 *
	 * @param {import("puppeteer").Page} page
	 * A `puppeteer.Page`. This function will close the page when the item is not
	 * found or at the end of this function.
	 *
	 * @param {string} q
	 * A query to search for. It can be anything but optimally it
	 * should be a combination of `${album} ${artist}`.
	 *
	 * @param {"firstPrice" |"firstPriceAlt" |"secondPrice" |"singleSong"} pattern
	 * A predefined pattern to search for an item's price:
	 * 1. `"firstPrice"` will usually select the first price card in the item's page
	 * that contains a price. Sometimes this is the cheapest price available from
	 * the other price cards.
	 * 2. `"firstPriceAlt"` works like `"firstPrice"`.
	 *
	 * @param {string} artist
	 *
	 * @returns {number} D.
	 *
	 * @example
	 * THis is something
	 * ```js
	 * let meow = 1
	 * ```
	 */
	// TODO write warning for when is this used for amazon site
	const scrapeAmazon = async (page, q, pattern, artist = "") => {
		q = q.toLowerCase()
			.split(" ")
			.join("+");

		const patterns = {
			firstPrice    : "#tmmSwatches a[href*='music'] span[class*='a-color'] span[class*='a-color']",
			firstPriceAlt : `#tmmSwatches a[href*='${artist}']`,
			secondPrice   : "#tmmSwatches a[href*='javascript'] span[class*='a-color'] span[class*='a-color']",
			singleSong    : "a[href*='handle-buy-box'] span"
		};
		const chosenPattern =
		Object.keys(patterns)
			.includes(pattern) ?
			patterns[pattern] :
			pattern;

		await page.goto(`https://www.amazon.com/s?k=${q}&i=music-intl-ship`);

		// DBG use the screenshot codes for debugging
		// await page.screenshot({ path : join(__dirname, "image.png") });

		const selectedItem = await page.waitForSelector(
			`#search .s-main-slot.s-search-results h2 a[href*="${q}"]`
		);
		const selectedItemTitle = await page.evaluate(
			item => item.querySelector("span")?.innerText,
			selectedItem
		);
		const selectedItemLink = await page.evaluate(
			item => item.href,
			selectedItem
		);
		await page.goto(selectedItemLink);

		// await page.screenshot({ path : join(__dirname, "image2.png") });

		let selectedPriceEl;
		try {
			selectedPriceEl = await page.waitForSelector(
				chosenPattern,
				{ timeout : 5000 }
			);
		} catch (err) {
			await page.close();
			throw new Error(`Price element not found! Try another pattern or make your own! Here's the item's link: ${selectedItemLink}`);
		}

		const selectedPrice = await page.evaluate(
			price => price.innerText,
			selectedPriceEl
		);

		await page.close();

		return {
			chosenPattern,
			selectedItemLink,
			selectedItemTitle,
			selectedPrice,
		};
	};

	const browser = await puppeteer.launch();
	const res = await scrapeAmazon(await browser.newPage(), "time deyaz", "singleSong");
	console.log(res);

	await browser.close();

};
/*  eslint-enable */

/**
 * **INFO: This scrapper was made based on what amazon look liked in 19/01/2022**
 *
 * This function will either scrape the album's price or possibly a single
 * song's price based on what was found in [Amazon Music, CDs & Vinyl category](https://www.amazon.com/s?i=music-intl-ship).
 *
 * @param {import("puppeteer").Page} page
 * A `puppeteer.Page`. This function will close the page when the price
 * container element is not found or at the end of this function.
 *
 * @param {string} q
 * A query to search for in Amazon. It can be anything but it is recommended to
 * be a combination of `${album | song} ${artist}`.
 *
 * @param {"priceCardsContainer" | "singleSongContainer"} priceContainerSelector
 * A selector to search for an item's price container element using
 * `page.waitForSelector`. You can pass your own or use some predefined ones:
 * 1. `"priceCardsContainer"` should be used when the amazon page list the
 * item's prices using price cards. As of now, this will select the
 * `"#tmmSwatches"` element in the amazon page which contains price cards for
 * the item.
 * 2. `"singleSongContainer"` should be used when the amazon page is a page for
 * a single song where there is only one price for the song.
 *
 * @param {RegExp} pricePattern
 * A regular expression to search for the prices inside of the found container's
 * `innerText`. Defaults to `/\$\d+.?\d{0,2}/g`.
 *
 * @returns {Promise<AmazonMusicData>}
 * A promise that resolves to {@link AmazonMusicData}.
 *
 * @example
 * ```js
 * const browser = await puppeteer.launch();
 * const page = await browser.newPage();
 * const res = await scrapeAmazonMusic(page, "21 adele", "priceCardsContainer");
 * console.log(res);
 * await browser.close();
 * ```
 */
const scrapeAmazonMusic = async (
	page,
	q,
	priceContainerSelector,
	pricePattern = /\$\d+.?\d{0,2}/g
) => {
	q = q.toLowerCase()
		.split(" ")
		.join("+");

	const priceContainerSelectors = {
		priceCardsContainer : "#tmmSwatches",
		singleSongContainer : "a[href*='handle-buy-box']"
	};
	const chosenPriceContainerSelector =
		Object.keys(priceContainerSelectors)
			.includes(priceContainerSelector) ?
			priceContainerSelectors[priceContainerSelector] :
			priceContainerSelector;

	await page.goto(`https://www.amazon.com/s?k=${q}&i=music-intl-ship`);

	// DBG use the screenshot codes for debugging
	// await page.screenshot({ path : join(__dirname, "image.png") });

	// TODO is it possible to revise this one with RegExp?
	const selectedItem = await page.waitForSelector(
		`#search .s-main-slot.s-search-results h2 a[href*="${q}"]`
	);
	const selectedItemTitle = await page.evaluate(
		item => item.querySelector("span")?.innerText,
		selectedItem
	);
	const selectedItemLink = await page.evaluate(
		item => item.href,
		selectedItem
	);
	await page.goto(selectedItemLink);

	// await page.screenshot({ path : join(__dirname, "image2.png") });

	let priceContainerElement;
	try {
		priceContainerElement = await page.waitForSelector(
			chosenPriceContainerSelector,
			{ timeout : 5000 }
		);
	} catch (err) {
		await page.close();
		throw new Error(`Price container element not found! Try another pattern! Here's the item's link: ${selectedItemLink}`);
	}

	const foundPrices = await page.evaluate(
		(el, source, flags) => el.innerText.match(new RegExp(source, flags)),
		priceContainerElement,
		pricePattern.source,
		pricePattern.flags
	);

	await page.close();

	/**
	 * Object containing data scraped from amazon music.
	 *
	 * @typedef {{
	 * chosenPriceContainerSelector:string,
	 * foundPrices:number[],
	 * selectedItemLink:string,
	 * selectedItemTitle:string
	 * }} AmazonMusicData
	 */

	/**
	 * @type {AmazonMusicData}
	 */
	const AmazonMusicData = {
		chosenPriceContainerSelector,
		foundPrices,
		selectedItemLink,
		selectedItemTitle
	};

	return AmazonMusicData;
};

