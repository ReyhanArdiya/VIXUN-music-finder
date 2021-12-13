"use strict";
// XXX rewrite this, it's super baddddddd; check notion Database transitiong group
const displayTopHits = {
	grid: document.querySelector("#display-top-hits-grid"),

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

displayTopHits.addDatabaseSongs(songDatabase1);
// PROG finish adding add grid song card logic
