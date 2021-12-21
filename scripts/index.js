"use strict";

// #region DISPLAY OBJECTS

// XXX rewrite this, it's super baddddddd; check notion Database transitiong group
const displayTopHits = {
	grid: document.querySelector("#display-top-hits-grid"),
	gridCircleDecorations: document.querySelectorAll("#display-top-hits svg"),

	/**
	 * Add a song card to top hits grid based on the {@link Song} object that is passed.
	 * @param {Song} Song {@link Song} object whose coverURL and fileURL property will be used for the card.
	 * @param { "SM" | "MD" | "LG" | "XL" } [size = "SM"]
	 */
	addSongCard({ coverURL, fileURL }, size = "SM") {
		/**@type {HTMLDivElement}*/
		const songCardTemplate = document.querySelector("#top-hits-item-template").content.firstElementChild.cloneNode(true);
		songCardTemplate.classList.add(`top-hits-item-${size.toUpperCase()}`);
		songCardTemplate.style.backgroundImage = `url(${coverURL})`;
		songCardTemplate.addEventListener("click", function () {
			window.open(fileURL);
		});
		this.grid.append(songCardTemplate);
	},

	/**
	 * Automatically add song cards from a {@link Song} database. For manual version use {@link displayTopHits.addSongCard}.
	 * @param {{sortSongs(whichProp: string, ascOrDesc: string): Song[]}} songDatabase A {@link SongDatabase} created from {@link newSongDatabase}.
	 */
	addDatabaseSongs(songDatabase) {
		const sortedSongs = songDatabase.sortSongs("downloads", "desc");
		const layout = {
			xl: ["XL"],
			smmd: ["SM", "MD"],
			mdsm: ["MD", "SM"],
			smsmsm: ["SM", "SM", "SM"],
			lgsmsm: ["LG", "SM", "SM"],
			smlgsm: ["SM", "LG", "SM"]
		};
		const layoutKeys = Object.keys(layout);
		let chosenLayout;
		let prevLayout;

		for (let i = 0; i < sortedSongs.length; ) {
			const useLayout = layout => {
				for (let size of layout) {
					try {
						this.addSongCard(sortedSongs[i], size);
						i++;
					} catch (error) {
						console.log("END ADDING SONGS", i);
					}
				}
			};
			const excludeThenChooseLayout = layoutKey => {
				const splicedLayoutKeys = [...layoutKeys];
				splicedLayoutKeys.splice(layoutKeys.indexOf(layoutKey), 1);
				return layout[splicedLayoutKeys[Math.floor(Math.random() * splicedLayoutKeys.length)]];
			};

			if (i === 0) {
				chosenLayout = layout.xl;
			}
			switch (prevLayout) {
				case layout.xl:
					chosenLayout = excludeThenChooseLayout("xl");
					break;
				case layout.smmd:
					chosenLayout = excludeThenChooseLayout("smmd");
					break;
				case layout.mdsm:
					chosenLayout = excludeThenChooseLayout("mdsm");
					break;
				case layout.smsmsm:
					chosenLayout = excludeThenChooseLayout("smsmsm");
					break;
				case layout.lgsmsm:
					chosenLayout = excludeThenChooseLayout("lgsmsm");
					break;
				case layout.smlgsm:
					chosenLayout = excludeThenChooseLayout("smlgsm");
					break;
			}

			useLayout(chosenLayout);
			prevLayout = chosenLayout;
		}
	}
};

const displayAds = {
	contentContainer: document.querySelector("#display-ads-content"),
	currentAds: document.querySelector("#display-ads-content").getElementsByTagName("img"),
	itemTemplate: document.querySelector("#display-ads-item-template").content.firstElementChild,

	_currentDisplayedAd: 1,
	get currentDisplayedAd() {
		return this._currentDisplayedAd;
	},

	appendNewAd(imgSource) {
		const adItem = this.itemTemplate.cloneNode(true);
		this.changeImage(adItem, imgSource);
		this.contentContainer.append(adItem);
	},

	changeImage(adObj, source) {
		adObj.src = source;
	},

	getAdObj(adNumber) {
		return document.querySelector(`.display-ads-item:nth-of-type(${adNumber})`);
	},

	autoScroll(delay) {
		setInterval(() => {
			this.contentContainer.scrollBy({ left: 300, behavior: "smooth" });
		}, delay);
	},

	scrollToAd(adNumber) {
		this.contentContainer.scrollLeft = this.getAdObj(adNumber).offsetLeft;
	},

	/**
	 * Only call this method ONCE to track {@link displayAds._currentDisplayedAd}.
	 */
	trackCurrentDisplayedAd() {
		const observer = new IntersectionObserver(
			entries => {
				for (let i = 0; i < this.currentAds.length; i++) {
					// True if an ad reference value (this.currentAds[i]) is the same as the reported observed target (entries[0].target). When an observed element (i.e. an ad) is intersecting, it is going to call this callback and pass the element that is intersecting right now AS THE ONLY ITEM in the entries parameter. Since we only get one item in entries, we just need to compare that reported element with all the current ads.
					if (this.currentAds[i] === entries[0].target) {
						this._currentDisplayedAd = i + 1;
						break;
					}
				}
			},
			{ root: this.contentContainer, threshold: 1 }
		);

		// Observe all current ads
		for (let i = 0; i < this.currentAds.length; i++) {
			observer.observe(this.currentAds[i]);
		}
	}
};

const displayBrowse = {
	categories: {
		container: document.querySelector("#display-browse-categories"),
		iconTemplate: document.querySelector("#icon-category-template"),

		addIcon(label = "Type", imgURL = "https://placekitten.com/100/100") {
			/**@type {HTMLDivElement}*/
			const icon = this.iconTemplate.content.firstElementChild.cloneNode(true);
			if (label.length) {
				label = `${label[0].toUpperCase()}${label.slice(1).toLowerCase()}`;
			}
			icon.lastElementChild.innerText = label;
			icon.firstElementChild.src = imgURL;
			this.container.append(icon);
		}
	},
	searchBar: document.querySelector("#display-browse-searchbar"),
	songs: document.querySelector("#display-browse-songs")
};

// #endregion DISPLAY OBJECTS

// #region DISPLAY TOP HITS LOGIC

// Add song cards from database to top hits grid
displayTopHits.addDatabaseSongs(songDatabase1);

// Add parallax to display top hits' circle decorations.
animationEffects.addParallax(displayTopHits.grid, displayTopHits.gridCircleDecorations, 0.05, "breakpointMedium");

// #endregion DISPLAY TOP HITS LOGIC

// #region DISPLAY ADS LOGIC

// DBG cute kitty placeholders :3
displayAds.appendNewAd("https://placekitten.com/200/300");
displayAds.appendNewAd("https://placekitten.com/300/200");
displayAds.appendNewAd("https://placekitten.com/300/300");
displayAds.appendNewAd("https://placekitten.com/400/300");
displayAds.appendNewAd("https://placekitten.com/300/400");
displayAds.appendNewAd("https://placekitten.com/500/500");

displayAds.trackCurrentDisplayedAd();

// displayAds.autoScroll(5000);

// #endregion DISPLAY ADS LOGIC

// #region DISPLAY BROWSE LOGIC

// DBG Add placeholder icons
displayBrowse.categories.addIcon("Pop", "https://placekitten.com/500/500");
displayBrowse.categories.addIcon("Shoegaze", "https://placekitten.com/400/400");
displayBrowse.categories.addIcon("Rock", "https://placekitten.com/300/300");
displayBrowse.categories.addIcon("Lo-Fi", "https://placekitten.com/200/200");
displayBrowse.categories.addIcon("Indie", "https://placekitten.com/100/100");
displayBrowse.categories.addIcon("Pop", "https://placekitten.com/500/500");
displayBrowse.categories.addIcon("Shoegaze", "https://placekitten.com/400/400");
displayBrowse.categories.addIcon("Rock", "https://placekitten.com/300/300");
displayBrowse.categories.addIcon("Lo-Fi", "https://placekitten.com/200/200");
displayBrowse.categories.addIcon("Indie", "https://placekitten.com/100/100");
displayBrowse.categories.addIcon("Pop", "https://placekitten.com/500/500");
displayBrowse.categories.addIcon("Shoegaze", "https://placekitten.com/400/400");
displayBrowse.categories.addIcon("Rock", "https://placekitten.com/300/300");
displayBrowse.categories.addIcon("Lo-Fi", "https://placekitten.com/200/200");
displayBrowse.categories.addIcon("Indie", "https://placekitten.com/100/100");
displayBrowse.categories.addIcon("Pop", "https://placekitten.com/500/500");
displayBrowse.categories.addIcon("Shoegaze", "https://placekitten.com/400/400");
displayBrowse.categories.addIcon("Rock", "https://placekitten.com/300/300");
displayBrowse.categories.addIcon("Lo-Fi", "https://placekitten.com/200/200");
displayBrowse.categories.addIcon("Indie", "https://placekitten.com/100/100");

// #endregion DISPLAY BROWSE LOGIC
