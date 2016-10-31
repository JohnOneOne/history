var express = require("express");
var router = express.Router();
var fs = require("fs");

router.get("/find", function (req, res, next) {
	fs.readFile("./data/find.json", function (err, data) {
		res.jsonp(data.toString());
	})
})

module.exports = router;