import { displayBrowse } from "./display-objects.js";

document.querySelector("#form-search-songs").addEventListener(
	"submit",
	async function(e) {
		e.preventDefault();
		for (const card of [ ...displayBrowse.songCard.cards ]) {
			card.remove();
		}
		const { target } = e;
		const params = target.elements.q.value;
		// eslint-disable-next-line no-undef
		const res = await axios.get(target.action, { params : { q : params } });
		console.log(res);
		displayBrowse.songCard.addCards(res.data);
		displayBrowse.songCard.info.observeOverflow(true, 0.8);
	}
);
