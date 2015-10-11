"use strict";

var bodyParser = require("body-parser");
var express = require("express");
var inin = require("inin");
var ibmdb = require('ibm_db');

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
      ibmdb.open("DRIVER={IBM DB2 ODBC DRIVER};DATABASE=SQLDB;HOSTNAME=75.126.155.153;UID=jhorwitz@live.unc.edu;PWD=Unicorns1+;PORT=50001;PROTOCOL=TCPIP", function (err,conn) {
        if (err) return console.log(err);
        var query = "select ismentor from user_list where email = \'", req.body.email, "\'";
        conn.query(query, function (err, data) {
          if (err) console.log(err);
          else alert(data);

          conn.close(function () {
            console.log('done');
          });
        });
      });
      res.send();
    }).catch(function(err) {
      res.status(500).send(err.message);
    });
  });

	this.router = router;
};

module.exports = Router;
