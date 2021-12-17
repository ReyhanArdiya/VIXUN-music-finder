"use strict";
const navbarMain = {
	menu: document.querySelector("#navbar-main"),
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
		/**@type {"content" | "dropdown"}*/
		whereIsTextOnLoad: mediaQuery.medium.matches ? "content" : "dropdown",
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
	},
	shadowScroll: new IntersectionObserver(
		function (entries) {
			navbarMain.menu.classList.toggle("navbar-main-shadow");
		},
		{
			root: null,
			rootMargin: "-1px 0px 0px 0px",
			threshold: 1
		}
	)
};

// Toggle navbar main shadow on sticky
navbarMain.shadowScroll.observe(navbarMain.menu);

// Add listener for navbar dropdown menu reveal/hide
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

// Add listener for navbar dropdown text move to content or vice-versa on medium breakpoint
mediaQuery.medium.addEventListener("change", function (e) {
	e.matches ? navbarMain.dropdown.moveText("content") : navbarMain.dropdown.moveText("dropdown");
});

// Move dropdown text on window load on larger screens
window.addEventListener("load", function () {
	navbarMain.dropdown.moveText(navbarMain.dropdown.whereIsTextOnLoad);
});
