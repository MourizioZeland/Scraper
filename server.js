//npm packages

var bodyPaser = require("body-parser");
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var app = express();
//logs request

app.use(logger("dev"));
app.use(
  bodyPaser.urlencoded({ 
    extended: false 
  })
);
app.use(express.static(process.cwd() + "/public"));

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");
mongoose.connect("mongodb://<dbuser>:<dbpassword>@ds241097.mlab.com:41097/heroku_vgtphr02");
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function(){
  console.log("Connected to Mongoose!");
});

var routes = require("./controller/controller.js");
app.use("/", routes);
//Create localhost port
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on PORT " + port);
});
