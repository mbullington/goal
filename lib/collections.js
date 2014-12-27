var _ = require('./helpers.js');

function Arguments(args) {
  return Array.prototype.slice.call(args);
}

// A Map-like object, with only Strings for keys.
// An Object with helper functions.
function Dictionary() {
  var args = Arguments(arguments);
  this.combine(args, true);
  
  Object.defineProperty(this, 'size', {
    'get': function() {
      return this.keys().length;
    }
  });
}

Dictionary.prototype.combine = function(args, overwrite) {
  if(!(args instanceof Array))
    args = [args];
  args.forEach(function(arg) {
    for(var prop in arg) {
      if(arg.hasOwnProperty(prop)) {
        if(!overwrite && (typeof this[prop] === "undefined" || this[prop] === null))
          return;
        this[prop] = arg[prop];
      }
    }
  });
  return this;
};

Dictionary.prototype.entries = function() {
  return this.keys().map(function(key) {
    return [key, this[key]];
  });
}

Dictionary.prototype.forEach = function(callback, thisArg) {
  if(typeof thisArg !== "undefined")
    callback = callback.bind(thisArg);
  this.keys().forEach(function(key) {
    callback(this[key], key, this);
  }, this);
  return this;
};

Dictionary.prototype.has = function(key) {
  var type = _.typeOf(this[key]);
  return type !== "undefined" && type !== "null";
}

Dictionary.prototype.keys = function() {
  return Object.keys(this);
};

Dictionary.prototype.values = function() {
  return this.keys().map(function(key) {
    return this[key];
  });
};

module.exports = {
  'Arguments': Arguments
  'Dictionary': Dictionary
};