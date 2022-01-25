import { displayBrowse } from "./display-objects.js";

// eslint-disable-next-line
const removeAllCards = () => {
	for (const card of [ ...displayBrowse.songCard.cards ]) {
		card.remove();
	}
};

let canAppendSongs = true;

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
	if (canAppendSongs) {
		canAppendSongs = false;

		const { songCard: { container }, search: { notFound } } = displayBrowse;

		const oldProgressBar = container.querySelector("svg");
		if (oldProgressBar) {
			oldProgressBar.remove();
		}

		const progressBar = new ProgressBar.Circle(
			container,
			{
				color    : "#ff0000",
				duration : 1800,
				easing   : "easeInOut",
				from     : { color : "#ff0000" },
				step(state, circle) {
					circle.path.setAttribute("stroke", state.color);
				},
				strokeWidth : 5,
				to          : { color : "#a129ff" },
			}
		);

		if (container.classList.contains("no-songs")) {
			container.classList.remove("no-songs");
		}
		removeAllCards();

		try {
			progressBar.animate(1);
			const res = await axios.get("/songs", {
				params  : { q },
				timeout : 10000
			});
			progressBar.destroy();
			removeAllCards();

			if (res.data.length) {
				displayBrowse.songCard.addCards(res.data);
				displayBrowse.songCard.info.observeOverflow(false, 0.8);
			} else {
				notFound.firstElementChild.innerText = "NOTHING FOUND";
				container.classList.add("no-songs");
			}
		} catch (err) {
			progressBar.destroy();
			removeAllCards();
			notFound.firstElementChild.innerText = "SOMETHING\nWENT WRONG";
			container.classList.add("no-songs");
		}

		if (getComputedStyle(notFound).display !== "none") {
			notFound.scrollIntoView(false);
		} else {
			displayBrowse.search.sortLabels.container.scrollIntoView(true);
		}

		canAppendSongs = true;
	}
};

const { form: searchBar } = displayBrowse.search;

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
		if (canAppendSongs) {
			searchBar.firstElementChild.value = title;
		}
		appendSongs(title);
	}
);