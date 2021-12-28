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

	// TODO making delegation to change active sort status
});


