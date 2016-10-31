var express = require("express");
var router = express.Router();
var fs = require("fs");

router.get("/licai", function (req, res, next) {
	fs.readFile("./data/licai.json", function (err, data) {
		res.jsonp(data.toString());
	})
})

module.exports = router;