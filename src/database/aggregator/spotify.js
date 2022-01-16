import axios from "axios";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path : join(__dirname, "..", "..", "..", "process.env") });

const getSpotifyToken = async (bearer = true) => {
	try {
		const res = await axios("https://accounts.spotify.com/api/token", {
			headers : {
				Authorization : `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`)
					.toString("base64")}`,
				"Content-Type" : "application/x-www-form-urlencoded"
			},
			method : "POST",
			params : { "grant_type" : "client_credentials" }
		});

		return res.data["access_token"];
	} catch (error) {
		console.log(error.response.status);
	}
};
