import core from "../../common/scripts/index.js";
import { displayTopHits } from "./display-objects.js";

const { animation: { animationEffects } } = core;

// Add song cards from database to top hits grid
window.addEventListener("load", async function() {
	try {
		const topHits = (await axios.get("/songs/top")).data?.data;
		const topHitsExt = topHits.map(s => {
			const {
				album  : { cover_big : image, title: album },
				title,
				artist : { name : artist }
			} = s;

			return {
				image,
				query : `${title} ${artist} ${album}`
			};
		});
		displayTopHits.addDatabaseSongs(topHitsExt);
	} catch (err) {
		console.error(err);
	}
});

// Add parallax to display top hits' circle decorations.
animationEffects.addParallax(
	displayTopHits.grid,
	displayTopHits.gridCircleDecorations,
	0.05,
	"breakpointMedium",
	true
);