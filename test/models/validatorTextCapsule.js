var validatorTextCapsule = require('../../models/validatorTextCapsule');
var vdt = validatorTextCapsule;
var _ = require('lodash');

var test = require('unit.js');

describe('validatorTextCapsule', function() {
  it('should give an error for release time < start time', function() {
    var st = 2;
    var rt = 1;

    var result;

    result = vdt.validate(st, rt, null);

    test
      .value(result['validateDateRange'].isError())
      .is(true);
  });

  it('should give an error for release time == start time', function() {
    var st = 1;
    var rt = 1;

    var result;

    result = vdt.validate(st, rt, null);

    test
      .value(result['validateDateRange'].isError())
      .is(true);
  });

  it('should not give an error for release time > start time', function () {
    var st = 1;
    var rt = 2;

    var result;

    result = vdt.validate(st, rt, null);

    test
      .value(result['validateDateRange'].isError())
      .is(false);
  });
});
