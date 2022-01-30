import core from "../../common/scripts/index.js";
import displayComments from "./comments.js";
import navbarMain from "../../common/scripts/navbar-main.js";

const { animation: { animationEffects } } = core;

// Setting up main navbar
navbarMain.dropdown.text[0].firstElementChild.innerText = "SONG";
navbarMain.dropdown.text[0].firstElementChild.href = "#page-header";
navbarMain.dropdown.text[1].firstElementChild.innerText = "COMMENTS";
navbarMain.dropdown.text[1].firstElementChild.href = "#display-comments";

// Add parallax for circle decos
const displayCommentsCircles = document.querySelectorAll("#display-comments svg[class*='circle-decoration']");
animationEffects.addParallax(
	document.querySelector("#display-comments-render"),
	displayCommentsCircles,
	0.1,
	"vertical",
	true
);

// Add playback logic to song image
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

// Share button logic
const share = document.getElementById("share");
const url = window.location.href;
share.addEventListener("click", async function() {
	navigator.share({ url });
});

// Comment form logic
const { form: { element, cancel }, render } = displayComments;
if (element) {
	element.addEventListener("submit", async function(e) {
		e.preventDefault();
		e.stopPropagation();
		const { target } = e;
		try {
			const comment = await axios.post(
				target.action,
				{ text : target.elements.text.value },
				{ timeout : 10000 }
			);
			render.renderComments(comment.data);
			element.elements.text.value = "";
			render.container.querySelector(".comment:last-of-type")
			             .scrollIntoView(false);
		} catch (err) {
		// TODO flash a message here or popup or something instead
			alert("Something went wrong :(");
		}
	});

	cancel.addEventListener("click", function() {
		element.elements.text.value = "";
	});
}


// Render comments logic
window.addEventListener("load", async function() {
	const song = await axios.get(window.location, { headers : { accept : "application/json" } });
	render.renderComments(...song.data.comments);
});