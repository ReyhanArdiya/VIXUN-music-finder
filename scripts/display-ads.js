const displayAds = {
	contentContainer: document.querySelector("#display-ads-content"),
	itemTemplate: document.querySelector("#display-ads-item-template").content.firstElementChild,

	appendNewAd(imgSource) {
		const adItem = this.itemTemplate.cloneNode(true);
		this.changeImage(adItem, imgSource);
		this.contentContainer.append(adItem);
	},

	changeImage(adObj, source) {
		adObj.src = source;
	},

	getAdObj(adNumber) {
		return document.querySelector(`.display-ads-item:nth-of-type(${adNumber})`);
	},

	autoScroll(delay) {
		setInterval(() => {
			this.contentContainer.scrollBy({ left: 300, behavior: "smooth" });
		}, delay);
	}
};

// DBG cute kitty placeholders :3
displayAds.appendNewAd("https://placekitten.com/200/300");
displayAds.appendNewAd("https://placekitten.com/300/200");
displayAds.appendNewAd("https://placekitten.com/300/300");
displayAds.appendNewAd("https://placekitten.com/400/300");
displayAds.appendNewAd("https://placekitten.com/300/400");
displayAds.appendNewAd("https://placekitten.com/500/500");

displayAds.autoScroll(5000);
