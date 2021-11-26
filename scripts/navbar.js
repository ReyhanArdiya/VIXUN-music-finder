const navbarMain = {
	content: {
		menu: document.querySelector("#navbar-main-content"),
		icons: {
			profile: document.querySelector("#icon-account path"),
			cart: document.querySelector("#icon-cart path"),
			hamburger: document.querySelector("#icon-hamburger svg"),
			hamburgerDiv: document.querySelector("#icon-hamburger")
		}
	},
	dropdown: {
		menu: document.querySelector("#navbar-main-dropdown"),
		text: document.querySelectorAll("#navbar-main-dropdown p"),
		control() {
			this.menu.classList.toggle("navbar-main-dropdown-show");
		}
	}
};

navbarMain.content.icons.hamburger.addEventListener(
	"click",
	(() => {
		let ongoing = false;
		return () => {
			console.log(ongoing);
			if (!ongoing) {
				navbarMain.dropdown.control();
				ongoing = true;
				setTimeout(() => {
					ongoing = false;
				}, 400);
			}
		};
	})()
);
