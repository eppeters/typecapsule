/**
 *
 * Note: This file is not yet Promisified. It's also kind of callback hell.
 * Refactor.
 *
 */

var util = require('util');
var express = require('express');
var router = express.Router();

var moment = require('moment');

var redisClient = require('../lib/redisClient');
var config = require('../config/params.js');

var _ = require('lodash');

/* GET home page. */
router.get('/', function(req, res) {

	res.render('open');

});

router.post(/^\/list\/?(\d+)?\/?(\d+)?/, function (req, res)	{
	// TODO: Input checking for the object
	// passed into the /open/list route via
	// POST
	var offset = req.params[0] || req.body.o || config.default_offset;
	var count = req.params[1] || req.body.c || config.default_list_quantity;
  console.log("count = : " + count + " offset = : " + offset);

	var nowStamp = moment().unix();
	console.log("nowStamp = " + nowStamp);

	redisClient.zrevrangebyscore("release_queue", nowStamp, "-inf", "LIMIT", offset, count,
		function (err, releaseSetNames)	{
			if (err)
				console.log("Error: " + err);

      var getReleaseSets = redisClient.multi();

			// queue up commands to get all of the submissions
			// NOTE: THIS BLOCKS for capsuleIDs.length/2 
			// iterations
			// TODO: Come up with a non-blocking solution
			for (var i = 0; i < releaseSetNames.length; ++i)
        getReleaseSets.smembers(releaseSetNames[i]);

			getReleaseSets.exec(function _getReleaseSetCapsuleNames(err, capNames)	{
        capNames = _.flatten(capNames);
        console.log(capNames, capNames.length);

				var j = 0;
				var capsules = {};

        var getCaps = redisClient.multi();

        for (var i = 0; i < capNames.length; ++i) {
          getCaps.hgetall(capNames[i]);
          console.log(capNames[i]);
        }

        getCaps.exec(function _buildCapsuleReturnObjects(err, capsules) {
          if (err) {
            console.log(err);
          }
          else {
            res.send(capsules);	
          }
        });
			});
		});
});

module.exports = router;
