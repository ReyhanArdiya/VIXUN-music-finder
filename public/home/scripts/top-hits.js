// Add song cards from database to top hits grid
displayTopHits.addDatabaseSongs(songDatabase1);

// Add parallax to display top hits' circle decorations.
animationEffects.addParallax(
	displayTopHits.grid,
	displayTopHits.gridCircleDecorations,
	0.05,
	"breakpointMedium"
);


