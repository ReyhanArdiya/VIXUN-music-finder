const animationEffects = {
	/**
	 * This is a factory function which returns a function that will automatically detect the scrolling direction of {@link scrollingEl} both for vertical and horizontal scrolling based on the {@link mediaQuery.medium} matches property.
	 * @param {HTMLElement} scrollingEl Any scrolling element to detect the direction of.
	 * @returns {() => "up" | "right" | "down" | "left"}
	 */
	detectScrollDirectionMaker(scrollingEl) {
		let prevScrollPos = 0;
		let currentScrollPos = 0;

		return () => {
			let direction = "unknown";

			if (mediaQuery.medium.matches) {
				currentScrollPos = scrollingEl.scrollLeft;
				direction = currentScrollPos >= prevScrollPos ? "right" : "left";
			} else {
				currentScrollPos = scrollingEl.scrollTop;
				direction = currentScrollPos >= prevScrollPos ? "down" : "up";
			}

			prevScrollPos = currentScrollPos;
			return direction;
		};
	},

	/**
	 * Adds parallax effect to an element based on a scrollable element.
	 * @param {HTMLElement} scrollingEl Any element that is scrollable, can be the container of the {@link parallaxedItemsArr} or any scrollable element.
	 * @param {HTMLElement[]} parallaxedItemsArr Array of any HTMLObject reference that will be parallaxed.
	 * @param {HTMLElement[]} speed Number to configure {@link parallaxedItemsArr}'s parallax speed.
	 */
	addParallax(scrollingEl, parallaxedItemsArr, speed) {
		let currentTranslateVal = 0;
		const detectScroll = animationEffects.detectScrollDirectionMaker(scrollingEl);

		scrollingEl.addEventListener("scroll", function (e) {
			if ((e.target.scrollTop === 0 && !mediaQuery.medium.matches) || (e.target.scrollLeft === 0 && mediaQuery.medium.matches)) {
				currentTranslateVal = 0;
			}

			/**
			 *
			 * @param {"up" | "right" | "down" | "left"} direction
			 */
			const moveCircles = direction => {
				for (let parallaxedItem of parallaxedItemsArr) {
					switch (direction) {
						case "down":
							currentTranslateVal -= speed;
							parallaxedItem.style.transform = `translateY(${currentTranslateVal}px)`;
							break;
						case "up":
							currentTranslateVal += speed;
							parallaxedItem.style.transform = `translateY(${currentTranslateVal}px)`;
							break;
						case "left":
							currentTranslateVal += speed;
							parallaxedItem.style.transform = `translateX(${currentTranslateVal}px)`;
							break;
						case "right":
							currentTranslateVal -= speed;
							parallaxedItem.style.transform = `translateX(${currentTranslateVal}px)`;
							break;
					}
				}
			};

			moveCircles(detectScroll());
		});
	}
};
