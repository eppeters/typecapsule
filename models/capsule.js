var redisClient = require('../lib/redisClient');
var Promise = require('rsvp').Promise;
var _ = require('lodash');

var Capsule = function(options) {
  this.config = {
     keys: {
        'nextCapId': 'next_cap_id',
     },
     namespaces: {
        'releaseList': 'rl:'
     }
  };

  this.config = _.extend(this.config, options);
};

var p = Capsule.prototype;

p.createNew = function(submissionTime, releaseTime, submissionText) {
   
   var capId;

   // Insert capId into list at namespaces.releaseList:releaseTime
   getNextCapId().then().then();
};

/**
 * Rejects with err or resolves with the next cap id.
 */
p.getNextCapId = function() {

  var config = this.config;

  function incNextCap(resolve, reject) {

     function handleIncr(err, response) {
        var successMsg;
        successMsg = config.keys.nextCapId + ' incremented';

        if (err) {
           reject(err);
        } 
        else {
           resolve(response);
        }
     }

     redisClient.incr(config.keys.nextCapId, handleIncr);
  }

   return new Promise(incNextCap);
};

module.exports = Capsule;
