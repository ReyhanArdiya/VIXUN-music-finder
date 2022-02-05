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

	notLoggedIn() {
		// eslint-disable-next-line no-undef
		Swal.fire({
			confirmButtonText : "Okay",
			icon              : "info",
			text              : "Login to favorite this song!",
			title             : "Not Logged In",
		});
	}
};

export default buttonFavorite;