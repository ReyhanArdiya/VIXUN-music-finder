const displayTopHits = {
	grid: document.querySelector("#display-top-hits-grid"),
	/**
	 *
	 * @param { "SM" | "MD" | "LG" } size
	 */
	addSongCard(size = "SM") {
		const songCardTemplate = /**@type {HTMLTemplateElement}*/ (
			document.querySelector("#top-hits-item-template")
		).content.firstElementChild.cloneNode(true);
		//@ts-expect-error
		songCardTemplate.classList.add(`top-hits-item-${size.toUpperCase()}`);
		this.grid.append(songCardTemplate);
	}
};
// TODO make manual and automatic add song
