var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var path = require("path");

// Modlels
var note = require("./models/note");
var article = require("./models/article");

// Scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

// Port
var PORT = 3030;

// Init Express
var app = express();

// Parsing
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}));

// Public set to static
app.use(express.static("public"));

// Handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
    defaultLayout: "main",
    partialsDir: path.join(__dirname, "/views/layouts/partials")
}));
app.set("view engine", "handlebars");

// Mongoose
mongoose.connect("mongodb://localhost/newscraper", { useNewUrlParser: true });

// Listen to Port
app.listen(PORT, function() {
    console.log(" App is running on https://localhost:" + PORT);
});