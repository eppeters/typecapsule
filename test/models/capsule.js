var test = require('unit.js');

var proxyquire = require('proxyquire');

var redisMock = require('redis-mock');
var redisMockClient = redisMock.createClient();
redisMockClient['@noCallThru'] = true; // Don't allow db connect methods, for instance, to be run

var Promise = require('rsvp').Promise;

var Capsule = proxyquire('../../models/capsule', { '../lib/redisClient': redisMockClient });

var capsule = new Capsule();

describe('getNextCapId:', function() {
   it('Must be a function', function() {
      test
         .value(capsule.getNextCapId).isType('function');
   });

  it('Should return a number', function(done) {

    capsule.getNextCapId()
    
    .then(function (returnValue) {
      test
        .value(returnValue).isType('number');
      done();
    })

    .catch(function(err) {
      throw err;
    });

  });

  it('Should increment each time it is called', function(done) {
     capsule.getNextCapId()
     
        .then(function(returnValue) {
           var value = returnValue;

           // No idea why, but proxyquire would not work when calling
           // getNextCapId from inside another .then() call
           capsule.getNextCapId().then(function(result) {
             test
              .value(result).is(value + 1);
            done();
           })
        })
        
  });
});
