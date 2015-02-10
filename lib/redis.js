var db = require('../config/secrets').redis;
var redis = require('redis');
var redisClient = redis.createClient(db.port, db.host, { "auth_pass" : db.auth });

// Console messages for redis connection
redisClient.on("error", function (err)	{ console.log("redis: error: " + err); });
redisClient.on("idle", function() { console.log("redis: gone idle"); });
redisClient.on("ready", function ()	{ console.log("redis: ready"); });
redisClient.on("connect", function () { console.log("redis: connected -- can accept commands"); });
redisClient.on("end", function () { console.log("redis: end -- connection closed"); });

module.exports = redisClient;
