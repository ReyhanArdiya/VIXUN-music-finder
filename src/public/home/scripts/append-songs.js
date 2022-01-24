import { displayBrowse } from "./display-objects.js";

/**
 * Removes all curent cards from DOM then calls
 * {@link displayBrowse.songCard.addCards} and appends the results.
 *
 * @param {string} q
 *
 * @example
 * ```
 * const searchBar = document.querySelector("#form-search-songs");
 *
 * searchBar.addEventListener(
 * 	"submit",
 * 	function(e) {
 * 		e.preventDefault();
 * 		appendSongs(e.target.elements.q.value);
 * 	}
 * );
 * ```
 */
const appendSongs = async q => {
	for (const card of [ ...displayBrowse.songCard.cards ]) {
		card.remove();
	}
	// eslint-disable-next-line no-undef
	const res = await axios.get("/songs", { params : { q } });
	for (const card of [ ...displayBrowse.songCard.cards ]) {
		card.remove();
	}
	displayBrowse.songCard.addCards(res.data);
	displayBrowse.songCard.info.observeOverflow(false, 0.8);
};

const searchBar = document.querySelector("#form-search-songs");

searchBar.addEventListener(
	"submit",
	function(e) {
		e.preventDefault();
		appendSongs(e.target.elements.q.value);
	}
);

document.querySelector("#display-browse-categories").addEventListener(
	"click",
	function(e) {
		const { title } = e.target.firstElementChild;
		appendSongs(title);
		searchBar.firstElementChild.value = title;
	}
);