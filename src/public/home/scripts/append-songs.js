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
	/* eslint-disable no-undef */
	const { container } = displayBrowse.songCard;
	const progressBar = new ProgressBar.Circle(
		container,
		{
			color       : "#ff0000",
			duration    : 1800,
			easing      : "easeInOut",
			from        : { color : "#ff0000" },
			strokeWidth : 5,
			to          : { color : "#a129ff" },
			// eslint-disable-next-line
			step (state, circle) {
				circle.path.setAttribute("stroke", state.color);
			}
		}
	);
	if (container.classList.contains("no-songs")) {
		container.classList.remove("no-songs");
	}
	for (const card of [ ...displayBrowse.songCard.cards ]) {
		card.remove();
	}
	progressBar.animate(1);
	const res = await axios.get("/songs", { params : { q } });
	progressBar.destroy();
	if (res.data.length) {
		for (const card of [ ...displayBrowse.songCard.cards ]) {
			card.remove();
		}
		displayBrowse.songCard.addCards(res.data);
		displayBrowse.songCard.info.observeOverflow(false, 0.8);
	} else {
		console.log(res.data);
		container.classList.add("no-songs");
	}
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