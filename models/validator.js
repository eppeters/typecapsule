var validator = {};
var v = validator;
var _ = require('lodash');

v.validate = function(/* variable */) {
  this.setInputs(arguments);
  this.setUpValidators();
  return this.runSuite();
};

v.runSuite = function() {
  var results = _.map(this.validators, _.bind(function runValidator(validator) {
    return validator.apply(this, this.inputs);
  }, this));

  return results;
};

v.setInputs = function(/* variable */) {
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
