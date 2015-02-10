var redisClient = require('../lib/redisClient');
var Promise = require('rsvp').Promise

var Capsule = function() {

}

var config = {
   keys: {
      'nextCapId': 'next_cap_id',
   },
   namespaces: {
      'releaseList': 'rl:'
   }
};

var p = Capsule.prototype;

p.createNew = function(submissionTime, releaseTime, submissionText) {
   
   var capId;

   // Insert capId into list at namespaces.releaseList:releaseTime
   getNextCapId().then().then();
}

/**
 * Rejects with err or resolves with the next cap id.
 */
function getNextCapId() {

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
}

module.exports.getNextCapId = getNextCapId;
