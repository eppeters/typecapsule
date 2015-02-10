var util = require('util');
var express = require('express');
var router = express.Router();


var capsule = require('../models/capsule');

router.post('/', function(req, res)	{

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
