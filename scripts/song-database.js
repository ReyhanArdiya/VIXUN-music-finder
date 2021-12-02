class Song {
	/**
	 *
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
	get isOnSale() {
		return this._isOnSale;
	}
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
}

// DBG
/**
 *
 * @param {(key: string) => unknown} callbackFn
 */
// const iterateOptionsKeys = callbackFn => {
// 	for (let key in options) {
// 		callbackFn(key);
// 	}
// };

const songDatabase = {
	/**
	 * If localStorage songs database is available use that value for this property, else set the value to empty array.
	 * @type { Song[] | any[] }
	 */
	//@ts-expect-error
	songs: localStorage.getItem("songs") ? setTimeout(() => songDatabase.getSongs(), 0) : [],
	/**
	 * Gets {@link songDatabase.songs} from localStorage and returns a {@link Song} array after setting each parsed {@link Song}'s prototype to {@link Song}.prototype.
	 * @param {boolean} [setToSongs = true] True to set the Song array instantly to {@link songDatabase.songs}, false to return it instead; defaults to true.
	 * @returns {undefined | Song[]}
	 */
	getSongs(setToSongs = true) {
		if (setToSongs) {
			this.songs = JSON.parse(localStorage.getItem("songs")).map((/** @type {Song} */ song) => Object.setPrototypeOf(song, Song.prototype));
		} else {
			return JSON.parse(localStorage.getItem("songs")).map((/** @type {Song} */ song) => Object.setPrototypeOf(song, Song.prototype));
		}
	},
	/**
	 * Set {@link songDatabase.songs} to localStorage.
	 */
	setSongs() {
		localStorage.setItem("songs", JSON.stringify(songDatabase.songs));
	},
	/**
	 * Adds a new {@link Song} object to {@link songDatabase.songs}.
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
		songDatabase.songs.push(new Song(title, artist, album, genre, year, priceUSD, coverURL, fileURL, isOnSale));
	},
	/**
	 * Removes a {@link Song} object from {@link songDatabase.songs} based on a {@link Song} property and its value.
	 * @param {"title" | "artist" | "album" | "genre" | "year" | "priceUSD" | "coverURL" | "fileURL" | "isOnSale"} whichProp
	 * @param {any} propValue
	 * @returns {Song | string} The deleted song
	 */
	delSong(whichProp, propValue) {
		return (
			this.songs.splice(
				this.songs.findIndex(song => song[whichProp] === propValue),
				1
			)[0] || "Song Not Found :("
		);
	},
	/**
	 * Returns a {@link Song} array filtered from {@link songDatabase.songs} based on ATLEAST one or more key-value pairs of each {@link Song} that is sent in the {@link options} parameter.
	 * @param {{ title: string,
	 * artist?: string,
	 * album?: string,
	 * genre?: string,
	 * year?: number,
	 * priceUSD?: number,
	 * coverURL?: string,
	 * fileURL?: string,
	 * isOnSale?: boolean }} options Object that contains key-value pairs like {@link Song} that is used during the filtering process.
	 * @param {boolean} [isCaseSensitive = true] If it is true, the values on each {@link options} properties is case sensitive when checked againts the same properties in a {@link Song}; defaults to true.
	 * @returns {Song[]} The filtered {@link Song} array.
	 */
	extractSongs(options, isCaseSensitive = true) {
		let optionsEntries = Object.entries(options);
		if (isCaseSensitive) {
			return this.songs.filter(song => optionsEntries.every(option => song[option[0]] === option[1]));
		} else {
			return this.songs.filter(song =>
				optionsEntries.every(option =>
					typeof song[option[0]] === "string"
						? song[option[0]].toLowerCase() === /**@type {string}*/ (option[1]).toLowerCase()
						: song[option[0]] === option[1]
				)
			);
		}
	},
	/**
	 * Returns a new sorted array of {@link songDatabase.songs}.
	 * @param {"title" | "artist" | "album" | "genre" | "year" | "priceUSD" | "coverURL" | "fileURL" | "isOnSale"} whichProp
	 * @param {"asc" | "desc"} [ascOrDesc = "asc"]
	 */
	sortSongs(whichProp, ascOrDesc = "asc") {
		return [...this.songs].sort((song1, song2) => {
			if (typeof song1[whichProp] === "string") {
				return ascOrDesc === "asc" ? (song1[whichProp] > song2[whichProp] ? 1 : -1) : song1[whichProp] < song2[whichProp] ? 1 : -1;
			} else {
				return ascOrDesc === "asc" ? song1[whichProp] - song2[whichProp] : song2[whichProp] - song1[whichProp];
			}
		});
	}
};

// DBG
// songDatabase.addSong("The Hours", "Beach House", "Bloom", "Shoegaze", 2011, 4.99, "url", "file");
// songDatabase.addSong("On the Sea", "Beach House", "Bloom", "Shoegaze", 2011, 4.99, "url", "file");
// songDatabase.addSong("Myth", "Beach House", "Bloom", "Shoegaze", 2011, 4.99, "url", "file");
// songDatabase.addSong("Beyond Love", "Beach House", "Depression Cherry", "Shoegaze", 2015, 4.99, "url", "file");
// songDatabase.addSong("PPP", "Beach House", "Depression Cherry", "Shoegaze", 2015, 4.99, "url", "file");
// songDatabase.addSong("Space Song", "Beach House", "Depression Cherry", "Shoegaze", 2015, 4.99, "url", "file");
// songDatabase.addSong("911", "Lady Gaga", "Chromatica", "Pop", 2015, 4.99, "url", "file");
// songDatabase.addSong("Alice", "Lady Gaga", "Chromatica", "Pop", 2015, 4.99, "url", "file");
// songDatabase.addSong("Replay", "Lady Gaga", "Chromatica", "Pop", 2015, 4.99, "url", "file");
