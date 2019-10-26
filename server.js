var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var logger = require("morgan");

// initialize express
var express = require("express");
var app = express();

// dev logger
app.use(logger("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// set public folder to static
app.use(express.static(process.cwd() + "/public"));

// handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// mongoose connection
mongoose.connect(
  "mongodb://heroku_grvb69vg:Theboss420!@ds237308.mlab.com:37308/heroku_grvb69vg"
);
var db = mongoose.connection;

// db connection error
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function() {
  console.log("We are connected through mongoose");
});

// port
var port = process.env.PORT || 3030;

// controller route
var routes = require("./controller/controller");
app.use("/", routes);

// listen to local network
app.listen(port, function() {
  console.log("Listening on https://localhost: " + port);
});
