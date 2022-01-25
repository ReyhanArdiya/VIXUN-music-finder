import core from "../../common/scripts/index.js";
import { displayTopHits } from "./display-objects.js";

const { animation: { animationEffects }, localSongDatabase } = core;

// Add song cards from database to top hits grid
displayTopHits.addDatabaseSongs(localSongDatabase);

// Add parallax to display top hits' circle decorations.
animationEffects.addParallax(
	displayTopHits.grid,
	displayTopHits.gridCircleDecorations,
	0.05,
	"breakpointMedium",
	true
);
