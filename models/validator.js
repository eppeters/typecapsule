var validator = {};
var v = validator;
var _ = require('lodash');

v.validate = function() {
  this.setInputs(arguments);
  this.setUpValidators();
  return this.runSuite();
};

v.runSuite = function() {
  var result = _.map(this.validators, _.bind(function runValidator(validator) {
    return validator.apply(this, this.inputs);
  }, this));

  return result;
};

v.setInputs = function() {
  this.inputs = arguments;
};

v.validators = [];

/**
 * Validator methods start with 'validate'
 */
v.setUpValidators = function() {
  var pattern = /^validate.+/;
  var methodNames = Object.keys(this);

  _.forEach(methodNames, _.bind(function(methodName) {
    if (methodName.match(pattern) !== null && typeof this[methodName] === 'function') {
      this.validators.push(this[methodName]);
    }
  }, this));
};

module.exports = validator;
