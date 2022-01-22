/**
 * Returns a string array from splitting `str` in half.
 *
 * @param {string} str
 *
 * @returns {string[]} The halved `str`.
 *
 * @example
 * ```js
 * console.log(halveStr("The hours beach house"));
 * ```
 */
const halveStr = str => {
	str = str.trim();
	const splitedStr = str.split(" ");
	const pushOn = Math.round(splitedStr.length * 0.5);
	const result = [];

	let word = "";
	for (let i = 0; i < splitedStr.length; i++) {
		if (i >= pushOn && !(i % pushOn)) {
			result.push(word.trimEnd());
			word = "";
		}
		word += `${splitedStr[i]} `;
	}
	if (word !== "") {
		result.push(word.trimEnd());
	}

	return result;
};

/**
 * Returns a string array where each string item in `strArr` is halved using {@link halveStr}.
 *
 * @param {string[]} strArr
 *
 * @returns {string[] | false}
 * Either the halved `strArr` or `false` indicating nothing was halved.
 *
 * @example
 * ```
 * console.log(halveStrArr([ "The hours beach house bloom" ]));
 * console.log(halveStrArr([ "The hours beach", "house bloom" ]));
 * console.log(halveStrArr([ "The hours", "beach", "house", "bloom" ]));
 * console.log(halveStrArr([ "The", "hours", "beach", "house", "bloom" ]));
 * ```
 */
const halveStrArr = strArr => {
	// CMT note to self, i think i could make a recursion out of this
	const halvedArr = strArr.flatMap(str => halveStr(str));

	return halvedArr.every((str, i) => str === strArr[i]) ? false : halvedArr;
};

/**
 * Queries the {@link Song} model and returns an array of `SongDocument` that
 * closely matches `q` and is sorted from the most relevant to the least based on
 * its `matchCount` property.
 *
 * @param {string} q
 * The string to query {@link Song} model. The more words there are in `q`, the
 * more specific the results will be. Other than `q`, the specificity of the results
 * can be configured using the `qThreshold` and `qMatchCountInc` parameter.
 *
 * @param {number} qThreshold
 * An optional integer or decimal from `0` to `100` to configure the threshold
 * for when a `SongDocument` should be included after matching it with `q`.
 * Defaults to `50`.
 *
 * @param {number} qMatchCountInc
 * An optional integer or decimal to configure how much to increment the match
 * count when a part of `SongDocument` matches a part of `q`. Defaults to `1`
 *
 * @returns {Promise<import("../../models/song.js").SongDocument[]>}
 * A promise that resolves into the results.
 *
 * @example
 * Using the default values for `qThreshold` and `qMatchCountInc`:
 * ```js
 * console.log(await querySongs("The Hours bloom beach house"));
 * ```
 *
 * Using the custom values for `qThreshold` and `qMatchCountInc`:
 * ```js
 * console.log(await querySongs("The Hours bloom beach house", 60.32, 0.8));
 * ```
 */
const querySongs = async (q, qThreshold = 50, qMatchCountInc = 1) => {
	const allSongs = await Song.find();
	const filtered = allSongs.filter(song => {
		const threshold = q.split(" ").length * (qThreshold / 100);
		let matchCount = 0;

		let halvedQ = [ q ];
		while (halvedQ) {
			for (const query of halvedQ) {
				if (new RegExp(query, "gi").test(song.desc)) {
					matchCount += qMatchCountInc;
				}
			}
			halvedQ = halveStrArr(halvedQ);
		}
		if (matchCount >= threshold) {
			song.matchCount = matchCount;

			return true;
		}
	});

	return filtered.sort((song1, song2) => song2.matchCount - song1.matchCount);
};
