var parent = require('./validator');
var result = require('./validationResult');
var _ = require('lodash');

var textCapsuleValidator = Object.create(parent);
var t = textCapsuleValidator;

t.validateDateRange = function (submissionTime, releaseTime, text) {

  var resultObj;

  if (releaseTime <= submissionTime ) {
    resultObj = result.get('error', 'the release time must be after the submission time');
  }
  else {
    resultObj = result.get('success', 'the release time is after the submission time');
  }

  return resultObj;
};

t.validateNotEmptyText = function (submissionTime, releaseTime, text) {
  var resultObj;

  if (text === '') {
    resultObj = result.get('error', 'you must submit some text');
  }
  else {
    resultObj = result.get('success', 'you submitted some text');
  }

  return resultObj;
};

t.validateIsString = function (submissionTime, releaseTime, text) {
  var resultObj;

  if (_.isString(text) === FALSE) {
    resultObj = result.get('error', 'the submitted text must be a string');
  }
  else {
    resultObj = result.get('success', 'the submitted text is a string');
  }

  return resultObj;
};

t.validateReleaseTimeGiven = function(submissionTime, releaseTime, text) {
  var resultObj;

  if (typeof releaseTime === 'undefined') {
  
  }
};
