
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
  return this.names[name];
};

statuses.getNameByCode = function(code) {
  return this.codes[code];
};

module.exports = statuses;
