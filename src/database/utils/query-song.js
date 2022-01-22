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
 * @returns {string[]}
 * An array where each string item in `strArr` is halved using {@link halveStr}.
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
	return strArr.flatMap(str => halveStr(str));
};
