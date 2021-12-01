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
		this.title = title;
		this.artist = artist;
		this.album = album;
		this.genre = genre;
		this.year = year;
		this.priceUSD = priceUSD;
		this.coverURL = coverURL;
		this.fileURL = fileURL;
		this.isOnSale = isOnSale;
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
	 * @returns {Song[]} The filtered {@link Song} array.
	 */
	extractSongs(options) {
		return this.songs.filter(song => Object.entries(options).every(option => song[option[0]] === option[1]));
	},
	/**
	 * Returns a {@link Song} array sorted from {@link songDatabase.songs} based on ATLEAST one or more properties of {@link Song} that is chosen in the {@link options} parameter.
	 * @param {{ title: boolean,
	 * artist?: boolean,
	 * album?: boolean,
	 * genre?: boolean,
	 * year?: boolean,
	 * priceUSD?: boolean,
	 * coverURL?: boolean,
	 * fileURL?: boolean,
	 * isOnSale?: boolean }} options Object with keys like {@link Song} and boolean values to choose which properties will be compared during the sorting process.
	 * @returns
	 */
	sortSongs(options) {}
	/* # Pseudocode
    1. Take `options` object
    2. Extract the key-values so that it can be used in the `sort`
    3. Spread songs array
    4. Sort new songs array based on all properties of `options`
    5. Return new sorted songs array */
};

// PROG finish most of data structure, add sortSongs next
