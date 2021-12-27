const express = require("express");
const path = require("path");
const sendFile = require("./routes/send-files");

const app = express();
const port = 9000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.listen(port, () => console.log(`Listening on port ${port}`));