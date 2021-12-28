import express from "express";
import { fileURLToPath } from "url";
import routesHome from "./routes/home.js";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = 9000;

const app = express();
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));
app.use(express.static(join(__dirname, "public")));

// TODO learn and use Route objects
// Set the routes for homepage
routesHome(app);

app.listen(port, () => console.log(`Listening on port ${port}`));
