const displayTopHits = {
	grid: document.querySelector("#display-top-hits-grid"),

	/**
	 * Add a song card to top hits grid based on the {@link Song} object that is passed.
	 * @param {Song} Song {@link Song} object whose coverURL and fileURL property will be used for the card.
	 * @param { "SM" | "MD" | "LG" } [size = "SM"]
	 */
	addSongCard({ coverURL, fileURL }, size = "SM") {
		const songCardTemplate = /**@type {HTMLDivElement}*/ (
			/**@type {HTMLTemplateElement}*/ (document.querySelector("#top-hits-item-template")).content.firstElementChild.cloneNode(true)
		);
		songCardTemplate.classList.add(`top-hits-item-${size.toUpperCase()}`);
		songCardTemplate.style.backgroundImage = `url(${coverURL})`;
		songCardTemplate.addEventListener("click", function () {
			window.open(fileURL);
		});
		this.grid.append(songCardTemplate);
	}
};
// TODO make manual and automatic add song
