"use strict";
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
 * @param {number} keyNumber Use this number to associate a certain localStorage songs database to the returned {@link SongDatabase} if there are multiple {@link SongDatabase} in the project. The basic syntax of the localStorage songs database key is `songs${keyNumber}`.
 * @param {boolean} autoUploadChanges Boolean to control automatic uploads whenever this {@link SongDatabase} is changed; defaults to true and can be changed through {@link SongDatabase.autoUploadChanges} getter and setter.
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
	 * isOnSale?: boolean }} options
	 */

	/**
	 * If localStorage songs database is available use that value for this property, else set the value to empty array.
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
	const uploadDatabase = () => {
		autoUploadChanges ? setSongs() : confirm("Want to upload current database?") && setSongs();
	};

	class SongDatabase {
		constructor() {
			songs = /**@type {Song[] | any[]}*/ (localStorage.getItem(`songs${keyNumber}`) ? setTimeout(() => this.getSongs(), 0) : []);
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
		// TODO update this doc
		/**
		 * Gets {@link songs} from localStorage and returns a {@link Song} array after setting each parsed {@link Song}'s prototype to {@link Song}.prototype.
		 * @param {boolean} [wrapInProxy = true] True to wrap each Song in parsedSongsDatabase in a proxy through {@link wrapSongProxy}, false to not wrap; defaults to true.
		 * @param {boolean} [setToSongs = true] True to set the Song array instantly to {@link songs}, false to return it instead; defaults to true.
		 * @returns {undefined | Song[]}
		 */
		getSongs(wrapInProxy = true, setToSongs = true) {
			/**@type {Song[]}*/
			const parsedSongsDatabase = JSON.parse(localStorage.getItem(`songs${keyNumber}`)).map((/** @type {Song} */ song) =>
				Object.setPrototypeOf(song, Song.prototype)
			);
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
		 * @param {"title" | "artist" | "album" | "genre" | "year" | "priceUSD" | "coverURL" | "fileURL" | "isOnSale"} whichProp
		 * @param {"asc" | "desc"} [ascOrDesc = "asc"]
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
const songDatabase2 = newSongDatabase(2);

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

// DBG songs1 localStorage
// [
//     {
//         "_title": "On the Sea",
//         "_artist": "Beach House",
//         "_album": "Bloom",
//         "_genre": "Shoegaze",
//         "_year": 2011,
//         "_priceUSD": 4.99,
//         "_coverURL": "url",
//         "_fileURL": "file",
//         "_isOnSale": false
//     },
//     {
//         "_title": "Myth",
//         "_artist": "Beach House",
//         "_album": "Bloom",
//         "_genre": "Shoegaze",
//         "_year": 2011,
//         "_priceUSD": 4.99,
//         "_coverURL": "url",
//         "_fileURL": "file",
//         "_isOnSale": false
//     },
//     {
//         "_title": "Beyond Love",
//         "_artist": "Beach House",
//         "_album": "Depression Cherry",
//         "_genre": "Shoegaze",
//         "_year": 2015,
//         "_priceUSD": 4.99,
//         "_coverURL": "url",
//         "_fileURL": "file",
//         "_isOnSale": false
//     },
//     {
//         "_title": "PPP",
//         "_artist": "Beach House",
//         "_album": "Depression Cherry",
//         "_genre": "Shoegaze",
//         "_year": 2015,
//         "_priceUSD": 4.99,
//         "_coverURL": "url",
//         "_fileURL": "file",
//         "_isOnSale": false
//     },
//     {
//         "_title": "Space Song",
//         "_artist": "Beach House",
//         "_album": "Depression Cherry",
//         "_genre": "Shoegaze",
//         "_year": 2015,
//         "_priceUSD": 4.99,
//         "_coverURL": "url",
//         "_fileURL": "file",
//         "_isOnSale": false
//     },
//     {
//         "_title": "911",
//         "_artist": "Lady Gaga",
//         "_album": "Chromatica",
//         "_genre": "Pop",
//         "_year": 2015,
//         "_priceUSD": 4.99,
//         "_coverURL": "url",
//         "_fileURL": "file",
//         "_isOnSale": false
//     },
//     {
//         "_title": "Alice",
//         "_artist": "Lady Gaga",
//         "_album": "Chromatica",
//         "_genre": "Pop",
//         "_year": 2015,
//         "_priceUSD": 4.99,
//         "_coverURL": "url",
//         "_fileURL": "file",
//         "_isOnSale": false
//     },
//     {
//         "_title": "Replay",
//         "_artist": "Lady Gaga",
//         "_album": "Chromatica",
//         "_genre": "Pop",
//         "_year": 2015,
//         "_priceUSD": 4.99,
//         "_coverURL": "url",
//         "_fileURL": "file",
//         "_isOnSale": false
//     },
//     {
//         "_title": "Myth",
//         "_artist": "Beach House",
//         "_album": "Bloom",
//         "_genre": "Shoegaze",
//         "_year": 2011,
//         "_priceUSD": 4.99,
//         "_coverURL": "url",
//         "_fileURL": "file",
//         "_isOnSale": false
//     }
// ]
