var util = require('util');
var express = require('express');
var router = express.Router();


var Capsule = require('../models/capsule');
var capsule = new Capsule();

router.post('/', function(req, res)	{

	var params = req.body;

  var submissionTime = params.s;
  var releaseTime = params.r;
  var submissionText = params.t;

  capsule.createNew(submissionTime, releaseTime, submissionText).catch(function(err) {
    res.send({
      success: false,
      error: err
    });
  });

  res.send({
    success: true,
    release: releaseTime * 1000
  });

});

module.exports = router;
