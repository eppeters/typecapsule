var validator = {};
var v = validator;
var _ = require('lodash');

v.validate = function() {
  this.setInputs(arguments);
  this.setUpValidators();
  this.runSuite();
};

v.runSuite = function() {
  _.forEach(this.validators, _.bind(function runValidator(validator) {
    validator(this.inputs);
  }, this));
};

v.setInputs = function() {
  this.inputs = arguments;
};

v.validators = [];

/**
 * Validators start with 'validate'
 */
v.setUpValidators = function() {
  var pattern = /^validate.+/;
  var methodNames = Object.keys(this);

  _.forEach(methodNames, _.bind(function(methodName) {
    if (methodName.match(pattern) !== null && typeof this[methodName] === 'function') {
      this.validators.push(this[methodName]);
    }
  }, this));
}

module.exports = validator;
