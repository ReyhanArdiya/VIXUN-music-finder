/* XXX rewrite this, it's super baddddddd; check notion Database
transitiong group */
export const displayTopHits = {
	grid                  : document.querySelector("#display-top-hits-grid"),
	gridCircleDecorations : document.querySelectorAll("#display-top-hits svg"),

	/**
	 * Add `Song` informations as a card to {@link displayTopHits.grid}.
	 *
	 * @param {Song} Song
	 * {@link Song} Object whose `coverURL` and `fileURL` property will be used
	 * for the card's image and click link respectively.
	 *
	 * @param { "SM" | "MD" | "LG" | "XL" } size
	 * String to set the size of the card.
	 *
	 * @example
	 * ```
	 * // Adds an XL card for a song with the title of "The Hours"
	 * const [ hours ] = songDatabase1.searchSongs({
	 * 	title : "The Hours"
	 * });
	 * displayTopHits.addSongCard(hours, "XL");
	 * ```
	 */
	addSongCard({ coverURL, fileURL }, size = "SM") {

		/**
		 * The template's clone.
		 *
		 * @type {HTMLDivElement}
		 */
		const songCardTemplate = document
			.querySelector("#top-hits-item-template")
			.content.firstElementChild.cloneNode(true);

		// Set the card's size
		songCardTemplate.classList.add(`top-hits-item-${size.toUpperCase()}`);

		// Add the card's cover from coverURL
		songCardTemplate.style.backgroundImage = `url(${coverURL})`;

		// Opens a link from fileURL when a song card is clicked
		songCardTemplate.addEventListener("click", () => {
			window.open(fileURL);
		});

		// Appends the card to the grid
		this.grid.append(songCardTemplate);
	},

	/**
	 * Automatically adds all song cards from a `SongDatabase.songs` starting
	 * from the most downloaded song to the least. For manual and individual
	 * version use {@link displayTopHits.addSongCard}.
	 *
	 * @param {SongDatabase} songDatabase
	 * A `SongDatabase` created from {@link newSongDatabase} whose `sortSongs`
	 * method will be used to sort its `songs` from the most `"downloads"` to
	 * the least.
	 *
	 * @example
	 * ```
	 * // Add song cards from all of songDatabase1 songs to top hits grid
	 * displayTopHits.addDatabaseSongs(songDatabase1);
	 * ```
	 */
	addDatabaseSongs(songDatabase) {
		const sortedSongs = songDatabase.sortSongs("downloads", "desc");
		const layout = {
			xl     : [ "XL" ],
			smmd   : [ "SM", "MD" ],
			mdsm   : [ "MD", "SM" ],
			smsmsm : [ "SM", "SM", "SM" ],
			lgsmsm : [ "LG", "SM", "SM" ],
			smlgsm : [ "SM", "LG", "SM" ]
		};
		const layoutKeys = Object.keys(layout);
		let chosenLayout;
		let prevLayout;

		for (let i = 0; i < sortedSongs.length;) {
			const useLayout = layout => {
				for (const size of layout) {
					try {
						this.addSongCard(sortedSongs[i], size);
						i++;
					} catch (error) {
						console.log("END ADDING SONGS", i);
					}
				}
			};
			const excludeThenChooseLayout = layoutKey => {
				const splicedLayoutKeys = [ ...layoutKeys ];
				splicedLayoutKeys.splice(layoutKeys.indexOf(layoutKey), 1);

				const whichLayout = splicedLayoutKeys[Math.floor(Math.random() *
					splicedLayoutKeys.length)];

				return layout[whichLayout];
			};

			// Always make the first card use the biggest size
			if (i === 0) {
				chosenLayout = layout.xl;
			}

			// Pseudo-randomly choose the layout for each card
			switch (prevLayout) {
				case layout.xl :
					chosenLayout = excludeThenChooseLayout("xl");
					break;

				case layout.smmd :
					chosenLayout = excludeThenChooseLayout("smmd");
					break;

				case layout.mdsm :
					chosenLayout = excludeThenChooseLayout("mdsm");
					break;

				case layout.smsmsm :
					chosenLayout = excludeThenChooseLayout("smsmsm");
					break;

				case layout.lgsmsm :
					chosenLayout = excludeThenChooseLayout("lgsmsm");
					break;

				case layout.smlgsm :
					chosenLayout = excludeThenChooseLayout("smlgsm");
					break;
			}
			useLayout(chosenLayout);
			prevLayout = chosenLayout;
		}
	}
};

export const displayAds = {
	contentContainer : document.querySelector("#display-ads-content"),

	/**
	 * @type {HTMLImageElement}
	 */
	itemTemplate : document.querySelector("#display-ads-item-template")
		.content.firstElementChild,

	currentAds : document.querySelector("#display-ads-content")
		.getElementsByTagName("img"),
	_currentDisplayedAd : 1,
	get currentDisplayedAd() {
		return this._currentDisplayedAd;
	},

	/**
	 * Appends a new ad to {@link displayAds.contentContainer} from `imgSource`.
	 *
	 * @param {string} imgSource The image's source path.
	 *
	 * @example
	 * ```
	 * displayAds.appendNewAd("image/img1.jpg");
	 * ```
	 */
	appendNewAd(imgSource) {
		const adItem = this.itemTemplate.cloneNode(true);
		this.changeImage(adItem, imgSource);
		this.contentContainer.append(adItem);
	},

	/**
	 * Changes an ad's `adObj.src` to  `source`.
	 *
	 * @param {HTMLElement} adObj
	 * An ad's `adObj` usually retrieved from {@link displayAds.getAdObj}.
	 *
	 * @param {string} source The path to the image's source.
	 *
	 * @example
	 * ```
	 * // Gets the first ad and change its image
	 * const firstAd = displayAds.getAdObj(1);
	 * displayAds.changeImage(firstAd, "images/ad1.jpg");
	 * ```
	 */
	changeImage(adObj, source) {
		adObj.src = source;
	},

	/**
	 * Returns the HTML object of a particular ad element chosen from its order
	 * in {@link displayAds.contentContainer}.
	 *
	 * @param {number} adNumber
	 * Which ad to get based on its order in {@link displayAds.contentContainer}
	 * from the left.
	 *
	 * @returns {HTMLImageElement} The ad's HTML Object reference.
	 *
	 * @example
	 * ```
	 * // Get the second ad
	 * displayAds.getAdObj(2)
	 * ```
	 */
	getAdObj(adNumber) {
		return document.querySelector(
			`.display-ads-item:nth-of-type(${adNumber})`
		);
	},

	/**
	 * Automatically scroll through each ad in
	 * {@link displayAds.contentContainer} from left to right.
	 *
	 * @param {number} delay The delay of each scroll.
	 *
	 * @returns {number} The interval's id if ever it is needed to be cleared.
	 *
	 * @example
	 * ```
	 * // Scroll through each ad every 3 seconds
	 * displayAds.autoScroll(3000)
	 * ```
	 */
	autoScroll(delay) {
		return setInterval(() => {

			// Scroll back to start after reaching the last ad, else just scroll
			if (this.currentDisplayedAd === this.currentAds.length) {
				this.scrollToAd(1);
			} else {
				this.contentContainer.scrollBy({
					left     : 300,
					behavior : "smooth"
				});
			}
		}, delay);
	},

	/**
	 * Scrolls {@link displayAds.contentContainer} to a certain ad based on its
	 * order.
	 *
	 * @param {number} adNumber
	 * Which ad to get based on its order in {@link displayAds.contentContainer}
	 * from the left.
	 *
	 * @example
	 * ```
	 * // Scrolls to the 3rd ad
	 * displayAds.scrollToAd(3)
	 * ```
	 */
	scrollToAd(adNumber) {
		this.contentContainer.scrollLeft = this.getAdObj(adNumber).offsetLeft;
	},

	/**
	 * Only call this method ONCE to track
	 * {@link displayAds._currentDisplayedAd} based on what ad is shown now.
	 * After this is called it is going to be removed from {@link displayAds}.
	 *
	 * @example
	 * ```
	 * // Start tracking the currently displayed ad
	 * displayAds.trackCurrentDisplayedAd()
	 * ```
	 */
	trackCurrentDisplayedAd() {
		const observer = new IntersectionObserver(
			([ entry ]) => {
				for (let i = 0; i < this.currentAds.length; i++) {

					/* True if an ad reference value (this.currentAds[i]) is
					the same as the reported observed target (entry.target).
					When an observed element (i.e. an ad) is intersecting, it
					is going to call this callback and pass the element that is
					intersecting right now AS THE ONLY ITEM in the entries
					parameter. Since we only get one item in entries,
					we just need to compare that reported element with all the
					current ads. */
					if (this.currentAds[i] === entry.target) {
						this._currentDisplayedAd = i + 1;
						break;
					}
				}
			},
			{
				root      : this.contentContainer,
				threshold : 1
			}
		);

		// Observe all current ads
		for (let i = 0; i < this.currentAds.length; i++) {
			observer.observe(this.currentAds[i]);
		}

		// Remove this method after being called once
		delete this.trackCurrentDisplayedAd;
	}
};

export const displayBrowse = {
	categories : {
		container    : document.querySelector("#display-browse-categories"),
		iconTemplate : document.querySelector("#icon-category-template"),

		/**
		 * Add a category icon and its text to
		 * {@link displayBrowse.categories.container}.
		 *
		 * @param {string} label
		 * The text for the icon where the casing will be automatically turned
		 * to something like these:
		 * - "FOO" => "Foo"
		 * - "bAR" => "Bar".
		 *
		 * Defaults to "Type".
		 *
		 * @param {string} imgURL
		 * URL to the icon's image, defaults to a cute cate image :D.
		 *
		 * @example
		 * ```
		 * // Adds an icon for "pop" category
		 * displayBrowse.categories.addIcon("Pop", "link/to/mic.png")
		 * ```
		 */
		addIcon(label = "Type", imgURL = "https://placekitten.com/100/100") {

			/**
			 * @type {HTMLDivElement}
			 */
			const icon = this.iconTemplate.content.firstElementChild.cloneNode(
				true
			);

			// Change the label's casing
			if (label.length) {
				label = `${label[0].toUpperCase()}${label.slice(1)
					.toLowerCase()}`;
			}

			icon.lastElementChild.innerText = label;
			icon.firstElementChild.src = imgURL;

			this.container.append(icon);
		}
	},

	search : {
		input      : document.querySelector("#display-browse-searchbar"),
		sortLabels : {
			container   : document.querySelector("#browse-searchbar-sorts"),
			labels      : document.querySelectorAll(".browse-sort-label"),
			activeLabel : null,

			/**
			 * Changes a label's class status which changes its color.
			 *
			 * @param {HTMLDivElement} sortLabel
			 * The label to be changed.
			 *
			 * @param {boolean} deactivate
			 * Use this to deactivate the label as in removing the status class
			 * and making it gray again.
			 *
			 * @returns {null | sortLabel}
			 * Returns `sortLabel` or `null` if deactivated.
			 *
			 * @example
			 * ```
			 * // Deactivate the active label
			 * const active = displayBrowse.search.sortLabels.activeLabel;
			 * displayBrowse.search.sortLabels.toggleStatus(active, false);
			 * ```
			 */
			toggleStatus(sortLabel, deactivate) {
				const { classList: labelStatus } = sortLabel;

				if (deactivate) {
					labelStatus.remove(
						"browse-sort-label-asc",
						"browse-sort-label-desc"
					);

					return null;
				} else if (
					!labelStatus.contains("browse-sort-label-asc") &&
					!labelStatus.contains("browse-sort-label-desc")
				) {
					labelStatus.toggle("browse-sort-label-asc");
				} else {
					labelStatus.toggle("browse-sort-label-asc");
					labelStatus.toggle("browse-sort-label-desc");
				}

				return sortLabel;
			}
		}
	},

	songs : document.querySelector("#display-browse-songs")
};

export default {
	displayTopHits,
	displayAds,
	displayBrowse
};