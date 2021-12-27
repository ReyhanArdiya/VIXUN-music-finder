const express = require("express");
const path = require("path");

const app = express();
const port = 9000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Set the routes for homepage
require("./routes/home")(app);

app.listen(port, () => console.log(`Listening on port ${port}`));
