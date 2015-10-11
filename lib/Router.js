"use strict";

var bodyParser = require("body-parser");
var express = require("express");
var inin = require("inin");

var Router = function () {

	var router = express.Router();
	var self = this;

  this.initialize = function () {
		var promise = new Promise(function (resolve, reject) {
			resolve();
    });
		return promise;
	};

	router.use(bodyParser.json());
	router.use("/", express.static("public"));

  //Posts to /login should contain a json object with 2 fields,
  //email and password
  router.post("/login", function(req, res) {
    inin.login(req.body.email, req.body.password).then(function(sessionData) {
      console.log("Logged in bitchez");
      res.send();
    }).catch(function(err) {
      res.status(500).send(err.message);
    });
  });

  router.post("/messages", function(req, res) {

  });

  router.get("/newsfeed", function(req, res) {

  });

	this.router = router;
};

module.exports = Router;
