import core from "../../common/scripts/index.js";
const { animation: { animationEffects }, localSongDatabase } = core;

import {
	displayAds,
	displayBrowse,
	displayTopHits
} from "./display-objects.js";

// #region -------------------TOP HITS LOGIC------------------------------------

// Add song cards from database to top hits grid
displayTopHits.addDatabaseSongs(localSongDatabase);

// Add parallax to display top hits' circle decorations.
animationEffects.addParallax(
	displayTopHits.grid,
	displayTopHits.gridCircleDecorations,
	0.05,
	"breakpointMedium"
);

// #endregion ================TOP HITS LOGIC====================================

// #region -------------------DISPLAY ADS LOGIC---------------------------------

// DBG cute kitty placeholders :3
displayAds.appendNewAd("https://placekitten.com/200/300");
displayAds.appendNewAd("https://placekitten.com/300/200");
displayAds.appendNewAd("https://placekitten.com/300/300");
displayAds.appendNewAd("https://placekitten.com/400/300");
displayAds.appendNewAd("https://placekitten.com/300/400");
displayAds.appendNewAd("https://placekitten.com/500/500");

displayAds.trackCurrentDisplayedAd();

displayAds.autoScroll(5000);

// #endregion ================DISPLAY ADS LOGIC=================================

// #region -------------------DISLPAY BROWSE LOGIC------------------------------

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

displayBrowse.search.sortLabels.container.addEventListener("click", e => {
	const label = e.target.parentElement;
	const { search: { sortLabels } } = displayBrowse;
	const { toggleStatus } = sortLabels;

	sortLabels.activeLabel = toggleStatus(label);

	// TODO make delegation to change active sort status
});

// #endregion ================DISLPAY BROWSE LOGIC==============================