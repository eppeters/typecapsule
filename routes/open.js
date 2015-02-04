var util = require('util');
var express = require('express');
var router = express.Router();

var moment = require('moment');

var db = require('../config/secrets').redis;

var redis = require('redis');
var redisClient = redis.createClient(db.port, db.host, { "auth_pass" : db.auth });
redisClient.on("error", function (err)	{ console.log("redis: error: " + err); });
redisClient.on("idle", function() { console.log("redis: gone idle"); });
redisClient.on("ready", function ()	{ console.log("redis: ready"); });
redisClient.on("connect", function () { console.log("redis: connected -- can accept commands"); });
redisClient.on("end", function () { console.log("redis: end -- connection closed"); });


/* GET home page. */
router.get('/', function(req, res) {

	res.render('open');

});

router.post('/list', function (req, res)	{

	console.log("count = : " + req.body.c + " offset = : " + req.body.o);

	// TODO: Input checking for the object
	// passed into the /open/list route via
	// POST
	var offset = req.body.o;
	var count = req.body.c;

	var nowStamp = moment().unix();

	console.log("nowStamp = " + nowStamp);

	redisClient.zrevrangebyscore("release_set", nowStamp, "-inf", "WITHSCORES", "LIMIT", offset, count,
		function (err, capsuleIDs)	{

			if (err)
				console.log("Error: " + err);

			console.log(capsuleIDs);

			var getCaps = redisClient.multi();

			// queue up commands to get all of the submissions
			// NOTE: THIS BLOCKS for capsuleIDs.length/2 
			// iterations
			// TODO: Come up with a non-blocking solution
			console.time("get IDs queue");
			for (var i = 0; i < capsuleIDs.length; i += 2)
				getCaps.hmget("c:" + capsuleIDs[i], "t", "s");
			console.timeEnd("get IDs queue");

			getCaps.exec(function _execGetCaps(err, textsAndSubmits)	{

				var j = 0;
				var capsules = {};

				// make the capsules into nice objects --
				// while I would like to send the client 
				// unorganized data for the browser to 
				// compile into nice js objects, we've got
				// to do some processing on this side because
				// not all browser support arrays, the return type
				// of the redis_node multi().exec() call
				console.time("build capsules");
				for (var i = 0; i < capsuleIDs.length; i += 2)	{

					console.log("i = " + i);
				
					// build the object to return (keyed by
					// capsule ID, with values that are 
					// objects representing the capsule)
					//
					console.log("capsuleIDs[i] = " + capsuleIDs[i]);
					console.log("capsuleIDs[i + 1] = " + capsuleIDs[i + 1]);

					capsules[capsuleIDs[i]] = {
					
						"s": textsAndSubmits[j][1],
						"r": capsuleIDs[i + 1],
						"t": textsAndSubmits[j][0]	
					
					};

					++j;

				}
				console.timeEnd("build capsules");

				res.send(capsules);	
			
			});

		
		});

});

module.exports = router;
