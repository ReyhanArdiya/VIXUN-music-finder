const circleDecorations = {
	topHitsGrid: document.querySelectorAll("#display-top-hits svg"),

	/**
	 * Adds parallax effect to circle decorations based on a scrollable element.
	 * @param {HTMLElement} scrollingEl Any element that is scrollable, can be the container of the {@link circleDecoCollection} decorations or any scrollable element.
	 * @param {HTMLElement[]} circleDecoCollection Array of circle decorations HTML object reference.
	 * @param {HTMLElement[]} speed Number to configure {@link circleDecoCollection}'s parallax speed.
	 */
	addParallax(scrollingEl, circleDecoCollection, speed) {
		let prevScrollPos = 0;
		let currentScrollPos = 0;
		let currentTranslateVal = 0;
		scrollingEl.addEventListener("scroll", function (e) {
			if ((e.target.scrollTop === 0 && !mediaQuery.medium.matches) || (e.target.scrollLeft === 0 && mediaQuery.medium.matches)) {
				currentTranslateVal = 0;
			}

			/**
			 * Automatically detects the scrolling direction of {@link scrollingEl} both for vertical and horizontal scrolling using {@link mediaQuery.medium} matches property. The returned value is intended to be passed to {@link moveCircles}.
			 * @returns {"up" | "right" | "down" | "left"}
			 */
			const detectScrollDirection = () => {
				let direction = "unknown";

				if (mediaQuery.medium.matches) {
					currentScrollPos = e.target.scrollLeft;
					direction = currentScrollPos >= prevScrollPos ? "right" : "left";
				} else {
					currentScrollPos = e.target.scrollTop;
					direction = currentScrollPos >= prevScrollPos ? "down" : "up";
				}

				prevScrollPos = currentScrollPos;
				return direction;
			};

			/**
			 *
			 * @param {"up" | "right" | "down" | "left"} direction
			 */
			const moveCircles = direction => {
				for (let circleDeco of circleDecoCollection) {
					switch (direction) {
						case "down":
							currentTranslateVal -= speed;
							circleDeco.style.transform = `translateY(${currentTranslateVal}px)`;
							break;
						case "up":
							currentTranslateVal += speed;
							circleDeco.style.transform = `translateY(${currentTranslateVal}px)`;
							break;
						case "left":
							currentTranslateVal += speed;
							circleDeco.style.transform = `translateX(${currentTranslateVal}px)`;
							break;
						case "right":
							currentTranslateVal -= speed;
							circleDeco.style.transform = `translateX(${currentTranslateVal}px)`;
							break;
					}
				}
			};

			moveCircles(detectScrollDirection());
		});
	}
};
