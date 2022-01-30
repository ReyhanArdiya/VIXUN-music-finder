import { config } from "dotenv";
import express from "express";
import { fileURLToPath } from "url";
import homeController from "../controllers/home.js";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path : join(__dirname, "..", "..", "process.env") });

const homeRouter = express.Router();

homeRouter.get("/", homeController.render);

export default homeRouter;
