const animationEffects = {
	/**
	 * This is a factory function which returns a function that will automatically detect the scrolling direction of {@link scrollingEl} both for vertical and horizontal scrolling or based on the {@link mediaQuery.medium} matches property.
	 * @param {HTMLElement} scrollingEl Any scrolling element to detect the direction of.
	 * @param {"horizontal" | "vertical" | "breakpointMedium"} trackDirection Track scrolling direction horizontally, vertically or based on {@link mediaQuery.medium} matches property. If "breakpointMedium" is chosen, if the matches property is false it will detect vertical scrolling and return either "down" or "up". If matches property is true, it will detect horizontal scrolling direction and return either "right" or "left".
	 * @returns {() => "up" | "right" | "down" | "left"}
	 */
	detectScrollDirectionMaker(scrollingEl, trackDirection) {
		let prevScrollPos = 0;
		let currentScrollPos = 0;

		return () => {
			let direction = "unknown";
			if (trackDirection === "horizontal" || (trackDirection === "breakpointMedium" && mediaQuery.medium.matches)) {
				currentScrollPos = scrollingEl.scrollLeft;
				direction = currentScrollPos >= prevScrollPos ? "right" : "left";
			} else if (trackDirection === "vertical" || (trackDirection === "breakpointMedium" && !mediaQuery.medium.matches)) {
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
	 * @param {"horizontal" | "vertical" | "breakpointMedium"} trackDirection String to set which scroll direction on {@link scrollingEl} to track and activate the parallax effect. The way it works is by passing this argument to {@link animationEffects.detectScrollDirectionMaker} and calling the returned function to get the tracked direction and move the parallaxed items based on the direction.
	 */
	addParallax(scrollingEl, parallaxedItemsArr, speed, trackDirection) {
		let currentTranslateVal = 0;
		const detectScroll = animationEffects.detectScrollDirectionMaker(scrollingEl, trackDirection);

		scrollingEl.addEventListener(
			"scroll",
			function (e) {
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
			},
			{ passive: true }
		);
	}
};
