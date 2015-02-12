var redisClient = require('../lib/redisClient');
var Promise = require('rsvp').Promise;
var _ = require('lodash');

var Capsule = function(options) {
  this.config = {
    keys: {
            'nextCapId': 'next_cap_id',
            'releaseQueue': 'release_queue'
          },
    namespaces: {
                  'releaseSet': 'rs:',
                  'capsuleObject': 'co:'
                }
  };

  this.config = _.extend(this.config, options);
};

var p = Capsule.prototype;

p.createNew = function(submissionTime, releaseTime, submissionText) {

  var capId;

  var promise =

    getNextCapId()

    .then(_.bind(this.createCapsuleHash, this, submissionTime, releaseTime, submissionText))

    .then(_.bind(this.addCapsuleHashToCapsuleSet, this, releaseTime))

    .then(_.bind(this.addCapsuleSetToReleaseZset, this, releaseTime));

  return promise;
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
        console.log(successMsg);
        resolve(response);
      }
    }

    redisClient.incr(config.keys.nextCapId, handleIncr);
  }

  return new Promise(incNextCap);
};

p.createCapsuleHash = function(submissionTime, releaseTime, submissionText, capId) {

  var config = this.config;

  function createHash(resolve, reject) {

    var hashName = config.namespaces.capsuleObject + capId;

    function handleCreateHash(err, response) {
      var successMsg;
      successMsg = 'key ' + hashName + ' created';

      if (err) {
        reject(err);
      } 
      else {
        resolve(hashName);
      }
    }

    redisClient.hmset(hashName, {
      'stime': submissionTime,
      'rtime': releaseTime,
      'stext': submissionText
    }, handleCreateHash);
  }

  return new Promise(createHash);
};

p.addCapsuleSetToReleaseZset = function(releaseTime, setName) {
  var config = this.config;

  function zsetAdd(resolve, reject) {

    var zsetName = config.keys.releaseQueue;

    function handleZsetAdd(err, response) {
      var successMsg;
      successMsg = setName + ' added to zset ' + zSetName;

      if (err) {
        reject(err);
      } 
      else {
        console.log(successMsg);
        resolve(hashName);
      }
    }

    redisClient.zadd(zsetName, {
      'stime': submissionTime,
      'rtime': releaseTime,
      'stext': submissionText
    }, handleZsetAdd);
  }

  return new Promise(zsetAdd);
};

p.addCapsuleHashToCapsuleSet = function(releaseTime, hashName) {
  var config = this.config;

  function setAdd(resolve, reject) {

    var setName = config.namespaces.releaseSet + releaseTime;

    function handleSetAdd(err, response) {
      var successMsg;
      successMsg = hashName + ' added to set ' + setName;

      if (err) {
        reject(err);
      } 
      else {
        console.log(successMsg);
        resolve(setName);
      }
    }

    redisClient.sadd(setName, hashName, handleSetAdd);
  }

  return new Promise(setAdd);

};

module.exports = Capsule;
