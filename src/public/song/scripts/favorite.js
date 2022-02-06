const buttonFavorite = {
	async addFavorite() {
		try {
			await axios.post(`${window.location.pathname}/favorite`);
			this.el.classList.add("added");
		} catch (err) {
			console.error(err);
		}
	},

	async deleteFavorite() {
		try {
			await axios.delete(`${window.location.pathname}/favorite`);
			this.el.classList.remove("added");
		} catch (err) {
			console.error(err);
		}
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