const userProfile = document.querySelector("#user-image img");
const profileFormInput = document.getElementById("form-profile-input");

userProfile.addEventListener("click", function() {
	profileFormInput.click();
});

profileFormInput.addEventListener("change", async function() {
	const progressBar = new ProgressBar.Circle(
		userProfile.parentElement,
		{
			color    : "#ff0000",
			duration : 3000,
			easing   : "easeInOut",
			from     : { color : "#ff0000" },
			step(state, circle) {
				circle.path.setAttribute("stroke", state.color);
			},
			strokeWidth : 5,
			to          : { color : "#a129ff" },
		}
	);

	try {
		if (profileFormInput.files[0].size > 1_000_000) {
			// TODO style this i guess
			alert("Image can't be larger than 1mb!");
		} else if (profileFormInput.files.length) {
			const imageData = new FormData();
			imageData.append("img", profileFormInput.files[0]);

			progressBar.animate(1);
			const newProfile = await axios.post(
				"/user/profile",
				imageData,
				{
					headers : { "Content-Type" : "multipart/form-data" },
					timeout : 10000
				}
			);

			userProfile.src = newProfile.data.path.replace("/upload", "/upload/w_250");
		}
	} catch (err) {
		alert(err.response?.data);
	}

	progressBar.destroy();
});