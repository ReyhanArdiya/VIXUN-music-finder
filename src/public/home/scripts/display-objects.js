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
			/**
			 * @param layout
			 *
			 * @example
			 */
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

			/**
			 * @param layoutKey
			 *
			 * @example
			 */
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
		container  : document.querySelector("#display-browse-categories"),
		icons      : document.querySelectorAll(".icon-category"),
		activeIcon : null
	},

	search : {
		input      : document.querySelector("#display-browse-searchbar"),
		sortLabels : {
			container   : document.querySelector("#browse-searchbar-sorts"),
			labels      : document.querySelectorAll(".browse-sort-label"),
			activeLabel : null
		}
	},

	songCard : {
		cards : document.querySelector("#display-browse-songs")
						 .getElementsByClassName("song-card"),
		circleDecos : document.querySelector("#display-browse-circle-decorations")
							   .getElementsByTagName("svg"),
		container : document.querySelector("#display-browse-songs"),
		info      : {
			collection : document.querySelector("#display-browse-songs")
				.getElementsByClassName("song-card-info"),

			/**
			 * Adds `IntersectionObserver` to all
			 * {@link displayBrowse.songCard.cards} that will `observe` their
			 * respective `.song-card-info` from
			 * {@link displayBrowse.songCard.info.collection}. If their
			 * respective * `.song-card-info` overflows, `toggle`
			 * `.song-card-info-scroll` (see styles in song-card.css).
			 *
			 * This method can be called multiple times as needed (e.g. When
			 * adding a new song card through AJAX).
			 *
			 * @param {boolean} oneTime
			 * Boolean to indicate if the `observer` should toggle the class
			 * once when this function is called (`true`) or if it should
			 * continue observing after calling the function (`false`).
			 *
			 * @param {number} observerThreshold
			 * Number to control the `IntersectionObserver`'s `threshold`;
			 * defaults to `0.5`.
			 *
			 * @example
			 * ```
			 * // Code to make new song card through AJAX...
			 * // Toggle the class once
			 * songCard.info.observeOverflow(true);
			 * ```
			 */
			observeOverflow(oneTime, observerThreshold = 0.5) {
				for (let i = 0; i < displayBrowse.songCard.cards.length; i++) {
					const observer = new IntersectionObserver(
						([ songInfo ]) => {
							if (!songInfo.isIntersecting) {
								songInfo.target.classList.toggle(
									"song-card-info-scroll"
								);
							}
						},
						{
							root      : displayBrowse.songCard.cards[i],
							threshold : observerThreshold
						}
					);

					observer.observe(this.collection[i]);
					setTimeout(() => {
						oneTime && observer.disconnect();
					}, 100);
				}
			}
		},

		/**
		 * @param songArr
		 *
		 * @example
		 */
		addCards(songArr) {
			const template = document.querySelector("#song-card-template")
				                      .content.firstElementChild;
			for (const song of songArr) {
				const card = template.cloneNode(true);
				const [ artist, info, price ] = card.children;
				artist.innerText = song.artist;
				info.innerText = `${song.title} - ${song.album}`;
				price.innerText = song.price;
				this.container.append(card);
			}
		}
	}
};

// window.displayBrowse = displayBrowse.categories.icons;

export default {
	displayTopHits,
	displayAds,
	displayBrowse
};