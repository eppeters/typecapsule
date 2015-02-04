var util = require('util');
var express = require('express');
var router = express.Router();

var db = require('../config/secrets').redis;
var redis = require('redis');
var redisClient = redis.createClient(db.port, db.host, { "auth_pass" : db.auth });
redisClient.on("error", function (err)	{ console.log("redis: error: " + err); });
redisClient.on("idle", function() { console.log("redis: gone idle"); });
redisClient.on("ready", function ()	{ console.log("redis: ready"); });
redisClient.on("connect", function () { console.log("redis: connected -- can accept commands"); });
redisClient.on("end", function () { console.log("redis: end -- connection closed"); });

router.post('/', function(req, res)	{

	// TODO: Add input checking to validate the post request body in the route to '/seal'
	// github issue #4
	

	// TODO: Replace the hard-typed names of redis keys
	// with vars from config files
	// github issue #5
	
	var capsule = req.body;
	
	redisClient.incr("next_cap_id",
		function(err, capsuleID)	{

			// TODO: Write clean-up functions that remove corrupted data when one
			// of the database call steps fails for /seal
			if (err)
				res.send("incr: " + err);

			// set the following key/value as a new hash:
			// 	c:capsuleID { // c = capsule
			//		
			//			s: <'s'ubmission time>
			//			t: <submission 't'ext>
			//
			// 	}
			redisClient.hmset("c:" + capsuleID, "s", capsule.s, "t", capsule.t,
				function _capsuleSetResult(err, reply)	{

					if (err)
						res.send("hmset" + err);
				
					// place a reference to the capsule in the sorted set of capsules,
					// with weight capsule.r (release time)
					redisClient.zadd("release_set", capsule.r, capsuleID,
						function _capsuleAddReleaseSet(err, reply)	{

							if (err)
								res.send("zadd: " + err);
			
							res.send("Hi!");
						
						});
				
				});
		
		});

});

module.exports = router;
