import core from "../../common/scripts/index.js";
import makeStatusToggler from "./toggle-status.js";

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


// Toggler for sort label status colors
displayBrowse.search.sortLabels.container.addEventListener("click", e => {
	let label;

	// XXX this works but it looks so weird tho, fiind another way if you can
	/* This if else is to target the e.target's parent that is
	   #browse-sort-label. The if is when the user clicks on the paragraph while
	   the else is when the user clicks on the arrow svg. If the else wasn't
	   used, clicking the arrow svg would change #browse-sort-label-arrow div
	   which only causes the arrow color to change and not the entire label */
	if (e.target.parentElement.classList.contains("browse-sort-label")) {
		label = e.target.parentElement;
	} else {
		label = e.target.parentElement.parentElement;
	}

	if (label.classList.contains("browse-sort-label")) {
		const { search: { sortLabels } } = displayBrowse;
		const labelToggler = makeStatusToggler(label, {
			statusOn  : "browse-sort-label-asc",
			statusOff : "browse-sort-label-desc",
		});

		sortLabels.activeLabel = labelToggler();
		console.log(sortLabels.activeLabel);
		for (const label of sortLabels.labels) {
			if (label !== sortLabels.activeLabel) {
				console.log("In loop");
				makeStatusToggler(label, {
					statusOn  : "browse-sort-label-asc",
					statusOff : "browse-sort-label-desc",
				})(true);
			}
		}

	}
});


// #endregion ================DISLPAY BROWSE LOGIC==============================