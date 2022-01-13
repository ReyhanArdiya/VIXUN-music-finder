import Song from "./models/song.js";
import mongoose from "mongoose";

const mongoDatabase = "VIXUNDB";
try {
	await mongoose.connect(`mongodb://localhost:27017/${mongoDatabase}`);
	console.log(`Connected to ${mongoDatabase}!🍃`);
} catch (err) {
	console.log(
		`Error! Can't connect to ${mongoDatabase}!🍂`,
		err
	);
}

await Song.insertMany([
	{
		album     : "Bloom",
		artist    : "Beach House",
		coverURL  : "url",
		downloads : 123880,
		genre     : "Shoegaze",
		isOnSale  : false,
		priceUSD  : 2,
		title     : "The Hours",
		year      : 2011,
	},
	{
		album     : "Bloom",
		artist    : "Beach House",
		coverURL  : "url",
		downloads : 3240,
		genre     : "Shoegaze",
		isOnSale  : false,
		priceUSD  : 2,
		title     : "Peoples",
		year      : 2011,
	},
	{
		album     : "Depression Cherry",
		artist    : "Beach House",
		coverURL  : "url",
		downloads : 9503,
		genre     : "Shoegaze",
		isOnSale  : false,
		priceUSD  : 4.99,
		title     : "Beyond Love",
		year      : 2015,
	},
	{
		album     : "Depression Cherry",
		artist    : "Beach House",
		coverURL  : "url",
		downloads : 3240,
		genre     : "Shoegaze",
		isOnSale  : false,
		priceUSD  : 4.99,
		title     : "Space Song",
		year      : 2015,
	},
	{
		album     : "Teenage Dreams",
		artist    : "Beach House",
		coverURL  : "url",
		downloads : 3230,
		genre     : "Shoegaze",
		isOnSale  : true,
		priceUSD  : 0.99,
		title     : "Used to Be",
		year      : 2009,
	},
	{
		album     : "Thank your lucky stars",
		artist    : "Beach House",
		coverURL  : "url",
		downloads : 530,
		genre     : "Shoegaze",
		isOnSale  : true,
		priceUSD  : 0.50,
		title     : "Elegy to the Void",
		year      : 2015,
	},
	{
		album     : "Chromatica",
		artist    : "Lady Gaga",
		coverURL  : "url",
		downloads : 75340,
		genre     : "Pop",
		isOnSale  : false,
		priceUSD  : 6.99,
		title     : "911",
		year      : 2020,
	},
	{
		album     : "The Fame Monster",
		artist    : "Lady Gaga",
		coverURL  : "url",
		downloads : 76280,
		genre     : "Pop",
		isOnSale  : false,
		priceUSD  : 6.99,
		title     : "Alejandor",
		year      : 2009,
	},
	{
		album     : "Born this Way",
		artist    : "Lady Gaga",
		coverURL  : "url",
		downloads : 4620,
		genre     : "Pop",
		isOnSale  : false,
		priceUSD  : 6.99,
		title     : "Government Hooker",
		year      : 2012,
	} ]);

console.log("Done seeding!");