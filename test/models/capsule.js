var test = require('unit.js');
var proxyquire = require('proxyquire');
var redisClientStub = {};

var Capsule = proxyquire('../../models/capsule', { 'redisClient': redisClientStub });

var capsule = new Capsule();

describe('getNextCapId:', function() {
   it('Must be a function', function() {
      test
         .value(capsule.getNextCapId).isType('function');
   });
});

describe('Return value of getNextCapId:', function() {
  it('Should be a number', function(done) {

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
});
