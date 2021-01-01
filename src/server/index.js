require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const path = require("path");

const handlers = require("./handlers.js");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serving the web pages
app.use("/", express.static(path.join(__dirname, "../public")));

// Application API calls

app.get("/rovers", handlers.handleRovers);
app.get("/rovers/:rovername", handlers.handleRover);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
