const buttonFavorite = {
	async addFavorite() {
		await axios.post(`${window.location.pathname}/favorite`);
		this.el.classList.add("added");
	},
	async deleteFavorite() {
		await axios.delete(`${window.location.pathname}/favorite`);
		this.el.classList.remove("added");
	},
	el : document.getElementById("favorite"),
};

export default buttonFavorite;