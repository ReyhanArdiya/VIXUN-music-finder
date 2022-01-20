import Song from "../../models/song.js";
import amazonMusic from "./amazon-music.js";
import deezer from "./deezer.js";
import spotify from "./spotify.js";

export const aggregatorAPIs = {
	amazonMusic,
	deezer,
	spotify
};

export default aggregator;