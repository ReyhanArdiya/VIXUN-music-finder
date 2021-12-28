/**
 * If `#navbar-main` exist on the page, then this will become the object for it
 * and automatically add all the necessary logic. Else it will become a string
 * warning and `console.error`'s it.
 *
 * @type {{} | string}
 */
// eslint-disable-next-line no-unused-vars
const navbarMain = (() => {
	if (document.querySelector("#navbar-main")) {

		// Make the object
		const navbarMain = {
			menu    : document.querySelector("#navbar-main"),
			content : {
				menu  : document.querySelector("#navbar-main-content"),
				icons : {
					profile   : document.querySelector("#icon-account path"),
					cart      : document.querySelector("#icon-cart path"),
					hamburger : document.querySelector(
						"#icon-hamburger svg"
					),
					hamburgerDiv : document.querySelector("#icon-hamburger")
				},
				textContainer : document.querySelector(
					"#navbar-main-content-text-container"
				)
			},
			dropdown : {

				/**
				 * @type {HTMLDivElement}
				 */
				menu : document.querySelector("#navbar-main-dropdown"),
				text : document.querySelectorAll("#navbar-main-dropdown p"),

				/**
				 * @type {"content" | "dropdown"}
				 */
				whereIsTextOnLoad : mediaQuery.medium.matches ?
					"content" :
					"dropdown",

				/**
				 * Shows or hide the dropdown menu.
				 *
				 * @example
				 * ```
				 * if (dropdownExist && smallScreen) {
				 * 	navbarMain.dropdown.control();
				 * }
				 * ```
				 */
				control() {
					this.menu.classList.toggle("navbar-main-dropdown-show");
				},

				/**
				 * Method to move the text inside of
				 * {@link navbarMain.dropdown.menu} to
				 * {@link navbarMain.content.menu} and vice-versa.
				 *
				 * @param {"content" | "dropdown"} where
				 * String to determine where to move text; default is "content".
				 *
				 * @example
				 * ```
				 * if (textInDropdown) {
				 * 	navbarMain.dropdown.moveText("content")
				 * }
				 * ```
				 */
				moveText(where = "content") {
					const [ txtOne, txtTwo ] = navbarMain.dropdown.text;
					if (where === "content") {
						navbarMain.content.icons.hamburgerDiv?.remove();
						navbarMain.content.textContainer.append(txtOne, txtTwo);
					} else if (where === "dropdown") {
						navbarMain.content.menu
							.append(navbarMain.content.icons.hamburgerDiv);
						navbarMain.dropdown.menu.append(txtOne, txtTwo);
					}
				}
			},
			shadowScroll : new IntersectionObserver(
				() => {
					navbarMain.menu.classList.toggle("navbar-main-shadow");
				},
				{
					root       : null,
					rootMargin : "-1px 0px 0px 0px",
					threshold  : 1
				}
			)
		};

		// #region ADD NAVBARMAIN LOGIC

		// Toggle navbar main shadow on sticky
		navbarMain.shadowScroll.observe(navbarMain.menu);

		// Add listener for navbar dropdown menu reveal/hide
		navbarMain.content.icons.hamburger.addEventListener(
			"click",
			(() => {
				let ongoing = false;

				return () => {
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

		/* Add listener for navbar dropdown text move to content or vice-versa
		on medium breakpoint */
		mediaQuery.medium.addEventListener("change", e => {
			 e.matches ?
				navbarMain.dropdown.moveText("content") :
				navbarMain.dropdown.moveText("dropdown");
		});

		// Move dropdown text on window load on larger screens
		window.addEventListener("load", () => {
			navbarMain.dropdown.moveText(navbarMain.dropdown.whereIsTextOnLoad);
		});

		// #endregion ADD NAVBARMAIN LOGIC

		// Return the object
		return navbarMain;
	} else {
		const msg = "#navbar-main not found!";
		console.warn(msg);

		return msg;
	}
})();


