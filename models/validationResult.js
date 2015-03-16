var statuses = require('./validationResultStatus');

var result = {};

result.resultObj = {
  'status': null,
  'statusCode': null,
  'message': null
};

function setStatus(obj, statusName) {
  var code = statuses.getCodeByName(statusName);
  var name = statuses.getNameByCode(code);

  obj.resultObj.statusCode = code;
  obj.resultObj.statusName = name;
};

function formatMessage(msg) {
  var formatted = msg.trim().toLowerCase();

  return formatted;
};

result.setError = function() {
  setStatus(this, 'error');
};

result.setSuccess = function() {
  setStatus(this, 'success');
}

result.setMessage = function(msg) {
  this.resultsObj.message = formatMessage(msg);
};

result.isError = function() {
  if (this.resultObj.statusCode === statuses.getCodeByName('error')) {
    return true;
  }

  return false;
}

result.isSuccess = function() {
  if (this.resultObj.statusCode === statuses.getCodeByName('success')) {
    return true;
  }

  return false;
}

result.getMessage = function() {
  return this.resultObj.message;
}

result.hasMessage = function() {
  return this.resultObj.message !== null;
}

module.exports = function() {
  return Object.create(result);
};
