var login = require("../router/login.js")
var licai = require("../router/licai.js")
var find = require("../router/find.js")
module.exports = function (app) {
	app.get("/login", login);
	app.get("/licai", licai);
	app.get("/find", find);
}