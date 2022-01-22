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
};
