"use strict";

var express = require("express");
var Router = require("./lib/Router");
var app = express();
var inin = require('inin');
var username = "jhorwitz@live.unc.edu";
var password = "Unicorns1+";

inin.login(username, password).then(function(sessionData) {
    console.log(sessionData);
}).catch(function(err) {
    console.log('Oh noes!', err);
});

var router = new Router();
app.use("/", router.router);

router.initialize().then(function () {});

//the app is locally hosted at port 8081, or set to an environmental variable by the host
var server = app.listen(process.env.PORT || 8081, function () {

	var host = server.address().address;
	var port = server.address().port;

	console.log("GurU listening at http://%s:%s", host, port);

});
