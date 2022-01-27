import checkNavbar from "../../common/scripts/navbar-main.js";

const navbarMain = checkNavbar();
navbarMain.dropdown.text[0].firstElementChild.innerText = "SONG";
navbarMain.dropdown.text[0].firstElementChild.href = "#page-header";
navbarMain.dropdown.text[1].firstElementChild.innerText = "COMMENTS";
navbarMain.dropdown.text[1].firstElementChild.href = "#display-comments";
