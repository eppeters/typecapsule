var statuses = require('validationResultStatusCodes');

var result = {};

result.resultObj = {
  'status': null,
  'statusCode': null,
  'message': null
};

result.setStatus = function(statusName) {
  var code = statuses.getCodeByName(statusName);
  var name = statuses.getNameByCode(code);


  this.resultObj.statusCode = code;
  this.resultObj.statusName = name;
};

result.setMessage = function(msg) {
  this.resultsObj.message = formatMessage(msg);
};

result.get = function(statusName, msg) {
  if (arguments.length < 2) {
    throw new Error("Need a status name and message for a result");
  }
  this.setStatus(statusName);
  this.setMessage(msg);

  return this.yield();
};

result.yield = function() {
  return this.resultObj;
};

var formatMessage = function(msg) {
  var formatted = msg.trim().toLowerCase();

  return formatted;
};

module.exports = result;
