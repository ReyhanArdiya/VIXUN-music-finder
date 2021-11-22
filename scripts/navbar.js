const navbarMain = {
	main: document.querySelector("#navbar-main"),
	content: document.querySelector("#navbar-main-content"),
	dropdown: document.querySelector("#navbar-main-dropdown"),
	dropdownControl() {
		navbarMain.dropdown.classList.toggle("navbar-main-dropdown-show");
	}
};
