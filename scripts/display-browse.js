const displayBrowse = {
	categories: {
		container: document.querySelector("#display-browse-categories"),
		iconTemplate: document.querySelector("#icon-category-template"),

		addIcon(imgURL, label = "Type") {
			/**@type {HTMLDivElement}*/
			const icon = this.iconTemplate.content.firstElementChild.cloneNode(true);
			icon.lastElementChild.innerText = label;
			icon.firstElementChild.style.background = `url(${imgURL})`;
			console.log(icon);
			this.container.append(icon);
		}
	},
	searchBar: document.querySelector("#display-browse-searchbar"),
	songs: document.querySelector("#display-browse-songs")
};
