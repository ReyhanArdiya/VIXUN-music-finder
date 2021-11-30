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
	/** @type {Song[]} */
	songs: [],
	getSongs() {},
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
	}
};

songDatabase.addSong("Alejandro", "Lady Gaga", "The Fame Monster", "Pop", 2009, 4.99, "img", "url");
songDatabase.addSong("911", "Lady Gaga", "Chromatica", "Pop", 2009, 4.99, "img", "url");
songDatabase.addSong("The Hours", "Beach House", "Bloom", "shoegaze", 2011, 4.99, "img", "url");
songDatabase.addSong("On The Sea", "Beach House", "Bloom", "shoegaze", 2011, 4.99, "img", "url");
songDatabase.addSong("Beyond Love", "Beach House", "Depression Cherry", "shoegaze", 2015, 4.99, "img", "url");
