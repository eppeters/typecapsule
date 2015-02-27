var names = {
  'nextCapId': 'next_cap_id',
  'releaseQueue': 'release_queue'
};

module.exports.get = function(key) {
  if (typeof names[key] === 'undefined') {
    throw new Error("No key name exists for name " + key);
  }

  return names[key];
};
