var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

require("./config/configRouter.js")(app);

var server = app.listen(3001, function () {
	console.log("start 3001")
}); 