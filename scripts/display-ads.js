const displayAds = {
	contentContainer: document.querySelector("#display-ads-content"),
	currentAds: document.querySelector("#display-ads-content").getElementsByTagName("img"),
	itemTemplate: document.querySelector("#display-ads-item-template").content.firstElementChild,

	_currentDisplayedAd: 1,
	get currentDisplayedAd() {
		return this._currentDisplayedAd;
	},

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
	},

	scrollToAd(adNumber) {
		this.contentContainer.scrollLeft = this.getAdObj(adNumber).offsetLeft;
	},

	/**
	 * Only call this method ONCE to track {@link displayAds._currentDisplayedAd}.
	 */
	addObserverForScrollLoc() {
		const observer = new IntersectionObserver(
			entries => {
				for (let i = 0; i < this.currentAds.length; i++) {
					// True if an ad reference value (this.currentAds[i]) is the same as the reported observed target (entries[0].target). When an observed element (i.e. an ad) is intersecting, it is going to call this callback and pass the element that is intersecting right now AS THE ONLY ITEM in the entries parameter. Since we only get one item in entries, we just need to compare that reported element with all the current ads.
					if (this.currentAds[i] === entries[0].target) {
						this._currentDisplayedAd = i + 1;
						break;
					}
				}
			},
			{ root: this.contentContainer, threshold: 1 }
		);

		// Observe all current ads
		for (let i = 0; i < this.currentAds.length; i++) {
			observer.observe(this.currentAds[i]);
		}
	}
};

// DBG cute kitty placeholders :3
displayAds.appendNewAd("https://placekitten.com/200/300");
displayAds.appendNewAd("https://placekitten.com/300/200");
displayAds.appendNewAd("https://placekitten.com/300/300");
displayAds.appendNewAd("https://placekitten.com/400/300");
displayAds.appendNewAd("https://placekitten.com/300/400");
displayAds.appendNewAd("https://placekitten.com/500/500");

displayAds.addObserverForScrollLoc();
// displayAds.autoScroll(5000);
