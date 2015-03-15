var parent = require('./validator');
var result = require('./validationResult');
var _ = require('lodash');
var moment = require('moment');

var textCapsuleValidator = Object.create(parent);
var t = textCapsuleValidator;

var momentUnixTimeStampFormat = 'X';

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

t.validateTextNotEmpty = function (submissionTime, releaseTime, text) {
  var resultObj;

  if (text === '') {
    resultObj = result.get('error', 'you must submit some text');
  }
  else {
    resultObj = result.get('success', 'you submitted some text');
  }

  return resultObj;
};

t.validateTextIsString = function (submissionTime, releaseTime, text) {
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
    resultObj = result.get('error', 'the release time must be given');
  }
  else {
    resultObj = result.get('success', 'the release time was given');
  }

  return resultObj;
};

t.validateSubmissionTimeGiven = function(submissionTime, releaseTime, text) {
  var resultObj;

  if (typeof submissionTime === 'undefined') {
    resultObj = result.get('error', 'the submission time must be given');
  }
  else {
    resultObj = result.get('success', 'the submission time was given');
  }

  return resultObj;
};

t.validateTextGiven = function(submissionTime, releaseTime, text) {
  var resultObj;

  if (typeof text === 'undefined') {
    resultObj = result.get('error', 'the text must be given');
  }
  else {
    resultObj = result.get('success', 'the text was given');
  }

  return resultObj;
}

t.validateSubmissionTimeIsUnixTimestamp = function(submissionTime, releaseTime, text) {
  var resultObj;

  if (moment(submissionTime, momentUnixTimeStampFormat).isValid() === false) {
    resultObj = result.get('error', 'the submission time must be a valid UNIX timestamp');
  }
  else {
    resultObj = result.get('success', 'the submission time was a valid UNIX timestamp');
  }

  return resultObj;
}

t.validateReleaseTimeIsUnixTimestamp = function(submissionTime, releaseTime, text) {
  var resultObj;

  if (moment(releaseTime, momentUnixTimeStampFormat).isValid() === false) {
    resultObj = result.get('error', 'the release time must be a valid UNIX timestamp');
  }
  else {
    resultObj = result.get('success', 'the release time was a valid UNIX timestamp');
  }

  return resultObj;
}

t.validateSubmissionTimeWithinLast24Hours = function(submissionTime, releaseTime, text) {
  var resultObj;

  var dayAgoMoment = moment().subtract(24, 'hours');
  var submissionTimeMoment = moment(submissionTime, momentUnixTimestampFormat);

  if (moment.min(dayAgoMoment, submissionTimeMoment) == submissionTimeMoment) {
    resultObj = result.get('error', 'the submission time must be within the last 24 hours');
  }
  else {
    resultObj = result.get('success', 'the submission time was within the last 24 hours');
  }

  return resultObj;
}

module.exports = textCapsuleValidator;
