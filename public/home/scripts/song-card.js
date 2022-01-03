export const songCard = {
	cards : document.querySelector("#display-browse-songs")
		.getElementsByClassName("song-card"),

	info : {
		collection : document.querySelector("#display-browse-songs")
			.getElementsByClassName("song-card-info"),

		/**
		 * Adds `IntersectionObserver` to all {@link songCard.cards} that will
		 * `observer` their respective `.song-card-info` from
		 * {@link songCard.info.collection}. If their respective
		 * `.song-card-info` overflows, `toggle` `.song-card-info-scroll` (see
		 * the class' styles in song-card.css).
		 *
		 * This method can be called multiple times as needed (e.g. When adding
		 * a new song card through AJAX).
		 *
		 * @param {number} observerThreshold
		 * Number to control the `IntersectionObserver`'s `threshold`; defaults
		 * to `0.5`.
		 *
		 * @example
		 * ```
		 * // Code to make new song card through AJAX...
		 * songCard.info.observeOverflow();
		 * ```
		 */
		observeOverflow(observerThreshold = 0.5) {
			for (let i = 0; i < songCard.cards.length; i++) {
				const observer = new IntersectionObserver(
					([ songInfo ]) => {
						if (!songInfo.isIntersecting) {
							songInfo.target.classList.toggle(
								"song-card-info-scroll"
							);
						}
					},
					{
						root      : songCard.cards[i],
						threshold : observerThreshold
					}
				);

				observer.observe(this.collection[i]);
			}
		}


	}

};

export default songCard;