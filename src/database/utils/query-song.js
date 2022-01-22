/**
 * @param {string} str
 *
 * @example
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