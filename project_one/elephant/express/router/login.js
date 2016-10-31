var express = require("express");
var router = express.Router();
var fs = require("fs");

router.get("/login", function (req, res, next) {
	fs.readFile("./data/login.json", function (err, data) {
		var json = JSON.parse(data.toString());
		var name = req.query.username;
		console.log(name)
		var pwd = req.query.userpwd;
		var o;
		for (var i = 0; i < json.length; i++) {
			if (json[i].username == name && json[i].userpwd == pwd) {
				o = 1;
				res.jsonp({
					code: "0",
					msg: "成功"
				});
			}
		}
		if (o != 1) {
			res.jsonp({
				code: "1",
				msg: "失败"
			});
		}

	});

});

module.exports = router;