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
	songs: [],
	getSongs() {},
	setSongs() {},
	addSong() {},
	delSong() {},
	extractData() {}
};
