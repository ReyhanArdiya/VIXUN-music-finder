/*  eslint-disable jsdoc/require-jsdoc */
const convertPriceArr = aggregatedDataPrice => {
	return	aggregatedDataPrice.map(price => +price.slice(1));
};

const cheapestSongPrice = aggregatedDataPrice => {
	const convertedData = convertPriceArr(aggregatedDataPrice);
	const sortedData = convertedData.sort((a, b) => a - b);

	return sortedData[0];
};

export default cheapestSongPrice;