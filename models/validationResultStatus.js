
var statuses = {};

statuses.codes = {
  0: 'success',
  1: 'error'
};

// Flips the codes obj's keys/values
statuses.names = function() {
  var obj = {};

  Object.keys(codes).forEach(function(key) {
    obj[codes[key]] = key;
  });

  return obj;
}();

statuses.getCodeByName = function(name) {
  if (typeof this.names[name] === 'undefined') {
    throw new Error("Result status name " + name + " does not exist.");
  }
  return this.names[name];
};

statuses.getNameByCode = function(code) {
  if (typeof this.codes[code] === 'undefined') {
    throw new Error("Result status code " + code + " does not exist.");
  }
  return this.codes[code];
};

module.exports = statuses;
