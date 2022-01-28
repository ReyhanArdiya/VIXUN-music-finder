import checkNavbar from "../../common/scripts/navbar-main.js";
import core from "../../common/scripts/index.js";

const { animation: { animationEffects } } = core;

const navbarMain = checkNavbar();
navbarMain.dropdown.text[0].firstElementChild.innerText = "SONG";
navbarMain.dropdown.text[0].firstElementChild.href = "#page-header";
navbarMain.dropdown.text[1].firstElementChild.innerText = "COMMENTS";
navbarMain.dropdown.text[1].firstElementChild.href = "#display-comments";

const displayCommentsCircles = document.querySelectorAll("#display-comments svg[class*='circle-decoration']");
animationEffects.addParallax(
	document.querySelector("#display-comments-render"),
	displayCommentsCircles,
	0.1,
	"vertical",
	true
);

const audio = document.querySelector("#song-image audio");
const songPlay = document.getElementById("song-play");
const songPause = document.getElementById("song-pause");

document.querySelector("#song-image").addEventListener("click", function() {
	if (audio.paused) {
		audio.play();
		songPlay.style.display = "none";
		songPause.style.display = "block";
	} else {
		audio.pause();
		songPlay.style.display = "block";
		songPause.style.display = "none";
	}
});

audio.addEventListener("ended", function() {
	songPlay.style.display = "block";
	songPause.style.display = "none";
});