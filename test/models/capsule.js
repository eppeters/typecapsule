var test = require('unit.js');

var getNextCapId = require('../../models/capsule').getNextCapId;

describe('getNextCapId:', function() {
   it('Must be a function', function() {
      test
         .value(getNextCapId).isType('function')
   });
});
