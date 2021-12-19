const displayBrowse = {
	categories: {
		container: document.querySelector("#display-browse-categories"),
		iconTemplate: document.querySelector("#icon-category-template"),

		addIcon(label = "Type", imgURL = "https://placekitten.com/100/100") {
			/**@type {HTMLDivElement}*/
			const icon = this.iconTemplate.content.firstElementChild.cloneNode(true);
			if (label.length) {
				label = `${label[0].toUpperCase()}${label.slice(1).toLowerCase()}`;
			}
			icon.lastElementChild.innerText = label;
			icon.firstElementChild.src = imgURL;
			this.container.append(icon);
		}
	},
	searchBar: document.querySelector("#display-browse-searchbar"),
	songs: document.querySelector("#display-browse-songs")
};

// DBG
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
