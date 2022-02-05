const userProfile = document.getElementById("user-image");
const profileFormInput = document.getElementById("form-profile-input");

userProfile.addEventListener("click", function() {
	profileFormInput.click();
});

profileFormInput.addEventListener("change", async function() {
	try {
		if (profileFormInput.files[0].size > 1_000_000) {
			// TODO style this i guess
			alert("Image can't be larger than 1mb!");
		} else if (profileFormInput.files.length) {
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
			userProfile.src = newProfile.data.path.replace("/upload", "/upload/w_250");
		}
	} catch (err) {
		alert(err.response?.data);
	}
});