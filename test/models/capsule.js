var test = require('unit.js');

var proxyquire = require('proxyquire');

var redisMock = require('redis-mock');
var redisMockClient = redisMock.createClient();
redisMockClient['@noCallThru'] = true; // Don't allow db connect methods, for instance, to be run

var RSVP = require('rsvp');
var Promise = RSVP.Promise;

// Generic error handler for uncaught Promise errors -- really a sign that the tests are problematic,
// not the code.
RSVP.on('error', function(reason) {
  test.fail(reason);
});

var Capsule = proxyquire('../../models/capsule', { '../lib/redisClient': redisMockClient });

var capsule = new Capsule();

describe('getNextCapId', function() {
   it('Must be a function', function() {
      test
         .value(capsule.getNextCapId).isType('function');
   });

    it('Should return a promise', function() {
      test
        .value(capsule.createCapsuleHash()).isInstanceOf(Promise);
    });

  it('Promise should resolve with a number', function(done) {

    capsule.getNextCapId()
    
    .then(function (returnValue) {
      test
        .value(returnValue).isType('number');
      done();
    })

    .catch(function(err) {
      done(err);
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
           .catch(function(err) {
             done(err);
           });
        })
        
  });
});

describe('createCapsuleHash', function() {
  var stime = '123456789';
  var rtime = '987654321';
  var stext = 'Test submisson text';
  var id = 0;

  it('Must be a function', function() {
    test
      .value(capsule.createCapsuleHash).isType('function');
  });

  it('Should return a promise', function() {
    test
      .value(capsule.createCapsuleHash()).isInstanceOf(Promise);
  });

  it('Should return the correct hashName', function(done) {
    capsule.createCapsuleHash(stime, rtime, stext, id)
    
    .then(function(hashName) {
      test
        .value(hashName).is(capsule.config.namespaces.capsuleObject + id);
      done();
    })

    .catch(function (err) {
      done(err);
    });
  });
});

describe('addCapsuleHashNameToCapsuleSet', function() {
  var rtime = '987654321';
  var setNamePrefix = 'releaseSet:';
  var hashName = 'hashName';

  it('Must be a function', function() {
    test
      .value(capsule.addCapsuleHashNameToCapsuleSet).isType('function');
  });

  it('Should return a promise', function() {
    test
      .value(capsule.addCapsuleHashNameToCapsuleSet(rtime, hashName)).isInstanceOf(Promise);
  });

  it('Should not throw an error when valid params are given', function(done) {
    capsule.addCapsuleHashNameToCapsuleSet(rtime, hashName)
    
    .then(function(setName) {
      done();
    })

    .catch(function (err) {
      done(err);
    });
  });

  it('Should return the correct set name', function(done) {
    var expectedSetName = setNamePrefix + rtime;
    capsule.addCapsuleHashNameToCapsuleSet(rtime, hashName)
    
    .then(function(setName) {
      test
        .value(setName).is(expectedSetName);
      done();
    })

    .catch(function (err) {
      done(err);
    });
  });
  
  it('Should contain the hashName after an add', function(done) {
    capsule.addCapsuleHashNameToCapsuleSet(rtime, hashName)
    
    .then(function(setName) {
      redisMockClient.smembers(setName, function(err, result) {
        if (err) return done(err);

        test.value(result).hasValue(hashName);

        done();
      });
    })

    .catch(function (err) {
      done(err);
    });
  });
});
