"use strict";

// #region SONG DATABASE

/**
 * Creates a new Song object that contains information about a song.
 */
class Song {
	/**
	 * @param {string} title
	 * @param {string} artist
	 * @param {string} album
	 * @param {string} genre
	 * @param {number} year
	 * @param {number} priceUSD
	 * @param {string} coverURL
	 * @param {string} fileURL
	 * @param {boolean} isOnSale
	 */
	constructor(title, artist, album, genre, year, priceUSD, coverURL, fileURL, isOnSale = false) {
		this._title = title;
		this._artist = artist;
		this._album = album;
		this._genre = genre;
		this._year = year;
		this._priceUSD = priceUSD;
		this._coverURL = coverURL;
		this._fileURL = fileURL;
		this._downloads = 0;
		this._isOnSale = isOnSale;
	}
	get title() {
		return this._title;
	}
	get artist() {
		return this._artist;
	}
	get album() {
		return this._album;
	}
	get genre() {
		return this._genre;
	}
	get year() {
		return this._year;
	}
	get priceUSD() {
		return this._priceUSD;
	}
	get coverURL() {
		return this._coverURL;
	}
	get fileURL() {
		return this._fileURL;
	}
	get downloads() {
		return this._downloads;
	}
	get isOnSale() {
		return this._isOnSale;
	}
	/**
	 * Use this property to check the validity of the song, e.g. properties with wrong value types, incomplete data, etc.
	 */
	get validity() {
		const errorObj = {
			missingProps: [],
			wrongTypes: {
				simple: [],
				verbose: []
			},
			isPriceRight: false,
			isValid: false
		};

		const dummySong = new Song("this", "is", "a", "dummy", 1, 1, "object", "meow", false);
		const songKeys = Object.keys(dummySong);
		const thisValidKeys = Object.entries(this)
			.filter(prop => prop[1] !== undefined)
			.map(prop => prop[0]);

		// Checks for missing properties
		songKeys.forEach(key => {
			if (!thisValidKeys.includes(key)) errorObj.missingProps.push(key);
		});

		// Checks for wrong value types
		songKeys.forEach(key => {
			if (typeof this[key] !== typeof dummySong[key]) errorObj.wrongTypes.simple.push(key);
			switch (key) {
				case "_title":
				case "_artist":
				case "_album":
				case "_genre":
				case "_coverURL":
				case "_fileURL":
					if (typeof this[key] !== "string") errorObj.wrongTypes.verbose.push(`this.${key} is ${typeof this[key]}, it should be string!`);
					break;
				case "_year":
				case "_priceUSD":
					if (typeof this[key] !== "number") errorObj.wrongTypes.verbose.push(`this.${key} is ${typeof this[key]}, it should be number!`);
					break;
				case "_isOnSale":
					if (typeof this[key] !== "boolean") errorObj.wrongTypes.verbose.push(`this.${key} is ${typeof this[key]}, it should be boolean!`);
					break;
			}
		});

		// Checks if price format is correct
		errorObj.isPriceRight = new RegExp(/^\d+(?:.\d{2})?$/i).test(`${this.priceUSD}`);

		if (!errorObj.missingProps.length && !errorObj.wrongTypes.simple.length && !errorObj.wrongTypes.verbose.length && errorObj.isPriceRight) {
			errorObj.isValid = true;
		}
		return errorObj;
	}
	set title(val) {
		if (typeof val === "string") {
			this._title = val;
		} else {
			console.error("Wrong type! It should be string!");
		}
	}
	set artist(val) {
		if (typeof val === "string") {
			this._artist = val;
		} else {
			console.error("Wrong type! It should be string!");
		}
	}
	set album(val) {
		if (typeof val === "string") {
			this._album = val;
		} else {
			console.error("Wrong type! It should be string!");
		}
	}
	set genre(val) {
		if (typeof val === "string") {
			this._genre = val;
		} else {
			console.error("Wrong type! It should be string!");
		}
	}
	set year(val) {
		if (typeof val === "number") {
			this._year = val;
		} else {
			console.error("Wrong type! It should be number!");
		}
	}
	set priceUSD(val) {
		if (typeof val === "number") {
			this._priceUSD = val;
		} else {
			console.error("Wrong type! It should be number!");
		}
	}
	set coverURL(val) {
		if (typeof val === "string") {
			this._coverURL = val;
		} else {
			console.error("Wrong type! It should be string!");
		}
	}
	set fileURL(val) {
		if (typeof val === "string") {
			this._fileURL = val;
		} else {
			console.error("Wrong type! It should be string!");
		}
	}
	set isOnSale(val) {
		if (typeof val === "boolean") {
			this._isOnSale = val;
		} else {
			console.error("Wrong type! It should be boolean!");
		}
	}
	addDownloads() {
		return this._downloads++;
	}
	toString() {
		return `Song with a title of ${this.title} by ${this.artist}`;
	}
}

/**
 * Creates a new {@link SongDatabase}, associate it with a certain localStorage songs database based on the {@link keyNumber} argument and return it.
 * @param {number} keyNumber Use this number to associate a certain localStorage songs database to the returned {@link SongDatabase}. Important to specify since there could be multiple {@link SongDatabase} in the project. The basic syntax of the localStorage songs database key is `songs${keyNumber}`.
 * @param {boolean} autoUploadChanges Boolean to control automatic uploads whenever this {@link SongDatabase} is changed through any appropiate means; defaults to true and can be read/write through {@link SongDatabase.autoUploadChanges} getter/setter.
 * @returns {SongDatabase}
 */
function newSongDatabase(keyNumber, autoUploadChanges = true) {
	/**
	 * Object that matches {@link Song} properties to be used for configuration during processes on {@link songs}.
	 * @typedef {{ title?: string,
	 * artist?: string,
	 * album?: string,
	 * genre?: string,
	 * year?: number,
	 * priceUSD?: number,
	 * coverURL?: string,
	 * fileURL?: string,
	 * downloads?: number,
	 * isOnSale?: boolean }} options
	 */

	/**
	 * Variable to store the song database which will be set later using {@link SongDatabase.getSongs} when a new {@link SongDatabase} is constructed. This variable will be stored in a closure enviroment for increased privacy.
	 * @type { Song[] | any[] }
	 */
	let songs;

	/**
	 * Set {@link songs} to localStorage.
	 */
	const setSongs = () => {
		if (songs.every(Song => Song.validity.isValid)) {
			localStorage.setItem(`songs${keyNumber}`, JSON.stringify(songs));
		} else {
			console.error("This database's songs has an invalid song! It won't be uploaded.");
		}
	};
	/**
	 * This function will only be useful when {@link autoUploadChanges} is false. It confirms wether you want to upload the changes before calling {@link setSongs}.
	 */
	const uploadDatabase = () => {
		autoUploadChanges ? setSongs() : confirm("Want to upload current database?") && setSongs();
	};

	class SongDatabase {
		constructor() {
			this.getSongs();
			Object.defineProperty(this, "songs", {
				get() {
					return songs;
				}
			});
			Object.defineProperty(this, "autoUploadChanges", {
				get() {
					return autoUploadChanges;
				},
				set(val) {
					if (typeof val === "boolean") {
						autoUploadChanges = val;
					} else {
						console.error("Wrong type! It should be boolean!");
					}
				}
			});
		}

		/**
		 * Processes {@link songs} from localStorage and wrap the resulting array in a proxy.
		 * @param {boolean} [wrapInProxy = true] True to wrap each Song in {@link parsedSongsDatabase} in a proxy through {@link wrapSongProxy}, false to not wrap; defaults to true.
		 * @param {boolean} [setToSongs = true] True to set the {@link proxiedSongsDatabase} instantly to {@link songs}, false to return it instead; defaults to true.
		 * @returns {undefined | any[] | Song[]}
		 */
		getSongs(wrapInProxy = true, setToSongs = true) {
			/**
			 * If the corresponding database exist in localStorage, parse it to an array and set each {@link Song} object inside prototype to {@link Song} class. If not set it to an empty array instead. Both of these arrays will be wrapped in a proxy through {@link proxiedSongsDatabase}.
			 * @type {Song[] | any[]}
			 * */
			const parsedSongsDatabase = localStorage.getItem(`songs${keyNumber}`)
				? JSON.parse(localStorage.getItem(`songs${keyNumber}`)).map((/** @type {Song} */ song) => Object.setPrototypeOf(song, Song.prototype))
				: [];
			wrapInProxy && parsedSongsDatabase.forEach((Song, i, arr) => arr.splice(i, 1, this.wrapSongProxy(Song)));
			const proxiedSongsDatabase = new Proxy(parsedSongsDatabase, {
				set(tar, prop, val) {
					Reflect.set(tar, prop, val);
					console.info(`${tar[prop]} has been changed to ${val}`);
					uploadDatabase();
					return true;
				},
				deleteProperty(tar, prop) {
					console.info(`${tar[prop]} has been deleted!`);
					uploadDatabase();
					return true;
				}
			});
			if (setToSongs) {
				songs = proxiedSongsDatabase;
			} else {
				return proxiedSongsDatabase;
			}
		}

		/**
		 * Adds a new {@link Song} object to {@link songs}. Arguments must be valid, if not it will console.error the new song's {@link Song.validity}; else it will console.log the new {@link songs}.length.
		 * @param {string} title
		 * @param {string} artist
		 * @param {string} album
		 * @param {string} genre
		 * @param {number} year
		 * @param {number} priceUSD
		 * @param {string} coverURL
		 * @param {string} fileURL
		 * @param {boolean} isOnSale
		 */
		addSong(title, artist, album, genre, year, priceUSD, coverURL, fileURL, isOnSale = false) {
			const newSong = new Song(title, artist, album, genre, year, priceUSD, coverURL, fileURL, isOnSale);
			return newSong.validity.isValid ? console.log(songs.push(this.wrapSongProxy(newSong))) : console.error(newSong.validity);
		}

		/**
		 * Removes ONE {@link Song} object from {@link songs} based on properties passed to {@link options} object and returns it.
		 * @param {options} options
		 * @param {boolean} [isCaseSensitive = true]
		 * @returns {Song | string} The deleted song or error message.
		 */
		delSong(options, isCaseSensitive = true) {
			const searchedSong = this.searchSongs(options, isCaseSensitive)[0];
			return songs.includes(searchedSong)
				? songs.splice(
						songs.findIndex(song => song === searchedSong),
						1
				  )[0]
				: "Song Not Found :(";
		}

		/**
		 * Returns a {@link Song} array filtered from {@link songs} based on ATLEAST one or more key-value pairs of each {@link Song} that is sent in the {@link options} parameter.
		 * @param {options} options Object that contains key-value pairs like {@link Song} that is used during the filtering process.
		 * @param {boolean} [isCaseSensitive = true] If it is true, the values on each {@link options} properties is case sensitive when checked againts the same properties in a {@link Song}; defaults to true.
		 * @returns {Song[]} The filtered {@link Song} array.
		 */
		searchSongs(options, isCaseSensitive = true) {
			let optionsEntries = Object.entries(options);
			if (isCaseSensitive) {
				return songs.filter(song => optionsEntries.every(option => song[option[0]] === option[1]));
			} else {
				return songs.filter(song =>
					optionsEntries.every(option =>
						typeof song[option[0]] === "string"
							? song[option[0]].toLowerCase() === /**@type {string}*/ (option[1]).toLowerCase()
							: song[option[0]] === option[1]
					)
				);
			}
		}

		/**
		 * Returns a new sorted array of {@link songs}.
		 * @param {"title" | "artist" | "album" | "genre" | "year" | "priceUSD" | "coverURL" | "fileURL" | "downloads" |"isOnSale" } whichProp
		 * @param {"asc" | "desc"} [ascOrDesc = "asc"]
		 * @returns {Song[]}
		 */
		sortSongs(whichProp, ascOrDesc = "asc") {
			return [...songs].sort((song1, song2) => {
				if (typeof song1[whichProp] === "string") {
					return ascOrDesc === "asc" ? (song1[whichProp] > song2[whichProp] ? 1 : -1) : song1[whichProp] < song2[whichProp] ? 1 : -1;
				} else {
					return ascOrDesc === "asc" ? song1[whichProp] - song2[whichProp] : song2[whichProp] - song1[whichProp];
				}
			});
		}

		/**
		 * Wraps a {@link Song} object in a proxy and returns it.
		 * @param {Song} Song
		 * @returns {Song}
		 */
		wrapSongProxy(Song) {
			return new Proxy(Song, {
				set(tar, prop, val) {
					const previousTarPropVal = Reflect.get(tar, prop);
					Reflect.set(tar, prop, val);
					if (previousTarPropVal !== Reflect.get(tar, prop)) {
						console.log(`This Song's ${String(prop)} has been changed from ${previousTarPropVal} to ${val}`);
						uploadDatabase();
					}
					return true;
				}
			});
		}
	}

	return new SongDatabase();
}

const songDatabase1 = newSongDatabase(1);

// DBG
// songDatabase1.addSong("The Hours", "Beach House", "Bloom", "Shoegaze", 2011, 4.99, "url", "url");
// songDatabase1.addSong("On the Sea", "Beach House", "Bloom", "Shoegaze", 2011, 4.99, "url", "url");
// songDatabase1.addSong("Peoples", "Beach House", "Bloom", "Shoegaze", 2011, 4.99, "url", "url");
// songDatabase1.addSong("Myth", "Beach House", "Bloom", "Shoegaze", 2011, 4.99, "url", "url");
// songDatabase1.addSong("Lazuli", "Beach House", "Bloom", "Shoegaze", 2011, 4.99, "url", "url");
// songDatabase1.addSong("911", "Lady Gaga", "Chromatice", "Pop", 2020, 4.99, "url", "url");
// songDatabase1.addSong("Alice", "Lady Gaga", "Chromatice", "Pop", 2020, 4.99, "url", "url");
// songDatabase1.addSong("Babylon", "Lady Gaga", "Chromatice", "Pop", 2020, 4.99, "url", "url");

// #endregion SONG DATABASE

// #region ANIMATION UTILITIES

/**
 * Use to store mediaQueryList objects for this website's media queries that needs behavior based on breakpoints.
 */
const mediaQuery = {
	medium: window.matchMedia("(min-width: 48em")
};

const animationEffects = {
	/**
	 * Adds parallax effect to an element based on a scrollable element.
	 * @param {HTMLElement} scrollingEl Any element that is scrollable, can be the container of the {@link parallaxedItemsArr} or any scrollable element.
	 * @param {HTMLElement[]} parallaxedItemsArr Array of any HTMLObject reference that will be parallaxed.
	 * @param {HTMLElement[]} speed Number to configure {@link parallaxedItemsArr}'s parallax speed.
	 * @param {"horizontal" | "vertical" | "breakpointMedium"} trackDirection String to set which scroll direction on {@link scrollingEl} to track and activate the parallax effect. The way it works is by passing this argument to {@link movementDetector.detectScrollDirectionMaker} and calling the returned function to get the tracked direction and move the parallaxed items based on the direction.
	 */
	addParallax(scrollingEl, parallaxedItemsArr, speed, trackDirection) {
		let currentTranslateVal = 0;
		const detectScroll = movementDetector.detectScrollDirectionMaker(scrollingEl, trackDirection);

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

const movementDetector = {
	/**
	 * Calls a callback when the user swipes on `target` and sends the swipe direction string as the first argument to the callback.
	 * @param {HTMLElement} target
	 * @param {"horizontal" | "vertical"} trackDirection
	 * @param {(direction: string, e?: TouchEvent) => {}} callback
	 */
	addTouchDirectionHandler(target, trackDirection, callback) {
		let currentTouchPos = 0;
		let prevTouchPos = 0;
		let direction = "unknown";

		target.addEventListener(
			"touchmove",
			function (e) {
				if (trackDirection === "horizontal") {
					currentTouchPos = e.targetTouches[0].pageX;
					direction = currentTouchPos >= prevTouchPos ? "right" : "left";
				} else if (trackDirection === "vertical") {
					currentTouchPos = e.targetTouches[0].pageY;
					direction = currentTouchPos >= prevTouchPos ? "down" : "up";
				}

				prevTouchPos = currentTouchPos;
				callback(direction, e);
			},
			{ passive: true }
		);
	},

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
	}
};

// #endregion ANIMATION UTILITIES

// #region REUSED HTML ELEMENTS

/**
 * If `#navbar-main` exist on the page, then this will become the object version for it and automatically add all the necessary logic. Else it will become a string warning and `console.error` it.
 * @type {{} | string}
 */
const navbarMain = (() => {
	if (document.querySelector("#navbar-main")) {
		// Make the object
		const navbarMain = {
			menu: document.querySelector("#navbar-main"),
			content: {
				menu: document.querySelector("#navbar-main-content"),
				icons: {
					profile: document.querySelector("#icon-account path"),
					cart: document.querySelector("#icon-cart path"),
					hamburger: document.querySelector("#icon-hamburger svg"),
					hamburgerDiv: document.querySelector("#icon-hamburger")
				},
				textContainer: document.querySelector("#navbar-main-content-text-container")
			},
			dropdown: {
				/**@type {HTMLDivElement}*/
				menu: document.querySelector("#navbar-main-dropdown"),
				text: document.querySelectorAll("#navbar-main-dropdown p"),
				/**@type {"content" | "dropdown"}*/
				whereIsTextOnLoad: mediaQuery.medium.matches ? "content" : "dropdown",
				control() {
					this.menu.classList.toggle("navbar-main-dropdown-show");
				},
				/**
				 * Method to move the text inside of {@link navbarMain.dropdown.menu} to {@link navbarMain.content.menu} and vice-versa.
				 * @param {"content" |"dropdown"} [where = "content"]
				 */
				moveText(where = "content") {
					if (where === "content") {
						navbarMain.content.icons.hamburgerDiv?.remove();
						navbarMain.content.textContainer.append(navbarMain.dropdown.text[0], navbarMain.dropdown.text[1]);
					} else if (where === "dropdown") {
						navbarMain.content.menu.append(navbarMain.content.icons.hamburgerDiv);
						navbarMain.dropdown.menu.append(navbarMain.dropdown.text[0], navbarMain.dropdown.text[1]);
					}
				}
			},
			shadowScroll: new IntersectionObserver(
				function (entries) {
					navbarMain.menu.classList.toggle("navbar-main-shadow");
				},
				{
					root: null,
					rootMargin: "-1px 0px 0px 0px",
					threshold: 1
				}
			)
		};

		// #region ADD NAVBARMAIN LOGIC

		// Toggle navbar main shadow on sticky
		navbarMain.shadowScroll.observe(navbarMain.menu);

		// Add listener for navbar dropdown menu reveal/hide
		navbarMain.content.icons.hamburger.addEventListener(
			"click",
			(() => {
				let ongoing = false;
				return () => {
					console.log(ongoing);
					if (!ongoing) {
						navbarMain.dropdown.control();
						ongoing = true;
						setTimeout(() => {
							ongoing = false;
						}, 400);
					}
				};
			})()
		);

		// Add listener for navbar dropdown text move to content or vice-versa on medium breakpoint
		mediaQuery.medium.addEventListener("change", function (e) {
			e.matches ? navbarMain.dropdown.moveText("content") : navbarMain.dropdown.moveText("dropdown");
		});

		// Move dropdown text on window load on larger screens
		window.addEventListener("load", function () {
			navbarMain.dropdown.moveText(navbarMain.dropdown.whereIsTextOnLoad);
		});

		// #endregion ADD NAVBARMAIN LOGIC

		// Return the object
		return navbarMain;
	} else {
		const msg = "#navbar-main not found! Remember to add it if needed, else just ignore this message :)";
		console.warn(msg);
		return msg;
	}
})();

// #endregion REUSED HTML ELEMENTS
