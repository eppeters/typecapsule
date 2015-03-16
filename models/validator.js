var validator = {};
var v = validator;
var _ = require('lodash');
var result = require('./validationResult')

v.validate = function(/* variable */) {
  this.setInputs(arguments);
  this.globalizeInputs();
  this.setUpValidators();
  return this.runSuite();
};

v.runSuite = function() {
  var results = {};

  _.forEach(Object.keys(this.validators), _.bind(function runValidator(validatorName) {
    var validator = this.validators[validatorName];
    var resultObj = result();
    // Mutates resultObj
    validator.call(this, resultObj);
    results[validatorName] = resultObj;
  }, this));

  return results;
};

v.setInputs = function(/* variable */) {
  this.inputs = arguments[0];
};

v.validators = {};

/**
 * Validator methods start with 'validate'
 */
v.setUpValidators = function() {
  var pattern = /^validate.+/;
  var methodNames = Object.keys(this);

  _.forEach(methodNames, _.bind(function(methodName) {
    if (methodName.match(pattern) !== null && typeof this[methodName] === 'function') {
      this.validators[methodName] = this[methodName];
    }
  }, this));
};

// Make all inputs global inside the extending module so that they are easily available to 
// all validator methods
v.globalizeInputs = function() {

}

module.exports = validator;
