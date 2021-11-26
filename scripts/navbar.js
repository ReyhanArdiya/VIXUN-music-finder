const navbarMain = {
	content: {
		menu: document.querySelector("#navbar-main-content"),
		icons: {
			profile: document.querySelector("#icon-account path"),
			cart: document.querySelector("#icon-cart path"),
			hamburger: document.querySelector("#icon-hamburger svg"),
			hamburgerDiv: document.querySelector("#icon-hamburger")
		},
		textContainer: document.querySelector("#navbar-main-content-text-container")
	},
	dropdown: {
		/**@type {HTMLDivElement}*/
		menu: document.querySelector("#navbar-main-dropdown"),
		text: document.querySelectorAll("#navbar-main-dropdown p"),
		control() {
			this.menu.classList.toggle("navbar-main-dropdown-show");
		},
		/**
		 * Method to move the text inside of {@link navbarMain.dropdown.menu} to {@link navbarMain.content.menu} and vice-versa.
		 * @param {"content" |"dropdown"} [where = "content"]
		 */
		moveText(where = "content") {
			if (where === "content") {
				navbarMain.content.icons.hamburgerDiv?.remove();
				navbarMain.content.textContainer.append(navbarMain.dropdown.text[0], navbarMain.dropdown.text[1]);
			} else if (where === "dropdown") {
				navbarMain.content.menu.append(navbarMain.content.icons.hamburgerDiv);
				navbarMain.dropdown.menu.append(navbarMain.dropdown.text[0], navbarMain.dropdown.text[1]);
			}
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

window.addEventListener("resize", function () {
	this.matchMedia("(min-width: 48em").matches ? navbarMain.dropdown.moveText("content") : navbarMain.dropdown.moveText("dropdown");
});
