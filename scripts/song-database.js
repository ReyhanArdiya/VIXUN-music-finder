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
}

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
