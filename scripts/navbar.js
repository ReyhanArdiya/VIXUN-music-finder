const navbarMain = {
	content: {
		menu: document.querySelector("#navbar-main-content"),
		icons: {
			profile: document.querySelector("#icon-account path"),
			cart: document.querySelector("#icon-cart path"),
			hamburger: document.querySelector("#icon-hamburger path")
		}
	},
	dropdown: {
		menu: document.querySelector("#navbar-main-dropdown"),
		control() {
			this.menu.classList.toggle("navbar-main-dropdown-show");
		}
	}
};
