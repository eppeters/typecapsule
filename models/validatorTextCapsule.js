var parent = require('./validator');
var _ = require('lodash');
var moment = require('moment');

var textCapsuleValidator = Object.create(parent);
var t = textCapsuleValidator;

var momentUnixTimestampFormat = 'X';

t.globalizeInputs = function () {
  submissionTime = this.inputs[0];
  releaseTime = this.inputs[1];
  text = this.inputs[2];
};

t.validateDateRange = function (resultObj) {

  if (releaseTime <= submissionTime ) {
    resultObj.setError();
  }
  else {
    resultObj.setSuccess();
  }

};

t.validateTextNotEmpty = function (resultObj) {

  if (text === '') {
    resultObj.setError();
  }
  else {
    resultObj.setSuccess();
  }

};

t.validateTextIsString = function (resultObj) {

  if (_.isString(text) === false) {
    resultObj.setError();
  }
  else {
    resultObj.setSuccess();
  }

};

t.validateReleaseTimeGiven = function (resultObj) {

  if (typeof releaseTime === 'undefined') {
    resultObj.setError();
  }
  else {
    resultObj.setSuccess();
  }

};

t.validateSubmissionTimeGiven = function (resultObj) {

  if (typeof submissionTime === 'undefined') {
    resultObj.setError();
  }
  else {
    resultObj.setSuccess();
  }

};

t.validateTextGiven = function (resultObj) {

  if (typeof text === 'undefined') {
    resultObj.setError();
  }
  else {
    resultObj.setSuccess();
  }

};

t.validateSubmissionTimeIsUnixTimestamp = function (resultObj) {

  if (moment(submissionTime, momentUnixTimestampFormat).isValid() === false) {
    resultObj.setError();
  }
  else {
    resultObj.setSuccess();
  }

};

t.validateReleaseTimeIsUnixTimestamp = function (resultObj) {

  if (moment(releaseTime, momentUnixTimestampFormat).isValid() === false) {
    resultObj.setError();
  }
  else {
    resultObj.setSuccess();
  }

};

t.validateSubmissionTimeWithinLast24Hours = function (resultObj) {

  var dayAgoMoment = moment().subtract(24, 'hours');
  var submissionTimeMoment = moment(submissionTime, momentUnixTimestampFormat);

  if (moment.min(dayAgoMoment, submissionTimeMoment) == submissionTimeMoment) {
    resultObj.setError();
  }
  else {
    resultObj.setSuccess();
  }

};

module.exports = textCapsuleValidator;
