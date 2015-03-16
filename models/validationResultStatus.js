var _ = require('lodash');

var statuses = {};

statuses.codes = {
  0: 'success',
  1: 'error'
};

// Flips the codes obj's keys/values
statuses.names = function() {
  var obj = {};

  Object.keys(statuses.codes).forEach(function(key) {
    obj[statuses.codes[key]] = key;
  });

  return obj;
}();

statuses.getCodeByName = function(name) {
  if (typeof this.names[name] === 'undefined') {
    throw new Error("Result status name " + name + " does not exist.");
  }

  console.log(this.names);
  return this.names[name];
};

statuses.getNameByCode = function(code) {
  if (typeof this.codes[code] === 'undefined') {
    throw new Error("Result status code " + code + " does not exist.");
  }
  return this.codes[code];
};

module.exports = statuses;
