class Song {
	/**
	 *
	 * @param {string} title
	 * @param {string} artist
	 * @param {string} album
	 * @param {string} genre
	 * @param {number} year
	 * @param {number} price
	 * @param {string} coverURL
	 * @param {string} fileURL
	 * @param {boolean} isOnSale
	 */
	constructor(title, artist, album, genre, year, price, coverURL, fileURL, isOnSale = false) {
		this.title = title;
		this.artist = artist;
		this.album = album;
		this.genre = genre;
		this.year = year;
		this.price = price;
		this.coverURL = coverURL;
		this.fileURL = fileURL;
		this.isOnSale = isOnSale;
	}
}

const songDatabase = {
	/** @type {Song[] | any[]} */
	songs: [],
	getSongs() {},
	setSongs() {},
	/**
	 * Adds a new {@link Song} object to {@link songDatabase.songs}.
	 * @param {string} title
	 * @param {string} artist
	 * @param {string} album
	 * @param {string} genre
	 * @param {number} year
	 * @param {number} price
	 * @param {string} coverURL
	 * @param {string} fileURL
	 * @param {boolean} isOnSale
	 */
	addSong(title, artist, album, genre, year, price, coverURL, fileURL, isOnSale = false) {
		songDatabase.songs.push(new Song(title, artist, album, genre, year, price, coverURL, fileURL, isOnSale));
	},
	delSong() {},
	extractData() {}
};
