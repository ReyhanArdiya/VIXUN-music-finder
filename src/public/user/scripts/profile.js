const userProfile = document.getElementById("user-image");
const profileFormInput = document.getElementById("form-profile-input");

// TODO add size limit
// TODO check what happens if upload not right format
userProfile.addEventListener("click", function() {
	profileFormInput.click();
});

profileFormInput.addEventListener("change", async function() {
	if (profileFormInput.value) {
		const imageData = new FormData();
		imageData.append("img", profileFormInput.files[0]);
		// TODO use loading screen here maybe
		const newProfile = await axios.post(
			"/user/profile",
			imageData,
			{
				headers : { "Content-Type" : "multipart/form-data" },
				timeout : 10000
			}
		);
		console.dir(profileFormInput);
		userProfile.src = newProfile.data.path.replace("/upload", "/upload/w_250");
	}
});