var _ = require('./helpers.js');

function args(args) {
  return Array.prototype.slice.call(args);
}

function each(obj, callback, thisArg) {
  if(typeof thisArg !== "undefined")
    callback = callback.bind(thisArg);
  
  var type = _.typeOf(obj),
      count = 0,
      keys = Object.keys(obj),
      length = keys.length;
      
  for(; count < length; count++) {
    var key = keys[count];
    callback(obj[key], type === "object" ? key : count, obj);
  }
}

function merge(dest) {
  var args = module.exports.args(arguments).splice(1),
      count = 0,
      length = args.length;
  for(; count < length; count++) {
    var arg = args[count];
    for(var prop in arg) {
      if(arg.hasOwnProperty(prop)) {
        dest[prop] = arg[prop];
      }
    }
  }
  return dest;
}

function map(obj, callback, thisArg) {
  if(typeof thisArg !== "undefined")
    callback = callback.bind(thisArg);
  
  var type = _.typeOf(obj),
      count = 0,
      keys = Object.keys(obj),
      length = keys.length
      returned = type === "object" ? {} : [];
      
  for(; count < length; count++) {
    var key = keys[count];
    if(type === "object") {
      returned[key] = callback(obj[key], key, obj);
    } else {
      returned.push(callback(key, count, obj));
    }
  }
  
  return returned;
}

function removeWhere(array, callback) {
  var returned = array;
  each(array, function(value) {
    if(callback(value))
      returned = returned.splice(0, array.indexOf(value)).concat(returned.splice(array.indexOf(value) + 1));
  });
  return returned;
}

module.exports = {
  'args': args,
  'each': each,
  'merge': merge,
  'map': map,
  'removeWhere': removeWhere
};