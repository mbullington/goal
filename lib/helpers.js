var _ = require('./collections.js');

function findChild(obj, pathArray) {
  pathArray.forEach(function(path) {
    if(!obj.hasOwnProperty(path))
      throw "findChild: Object does not have property!\n" + obj;
    obj = obj[path];
  });
  return obj;
}

// implementation of node's util.inherits,
// works in the browser as well
function inherits(constructor, superConstructor) {
  constructor.super_ = superConstructor;
  
  function A() {}
  A.prototype = superConstructor.prototype;
  constructor.prototype = new A();
  constructor.prototype.constructor = constructor;
  return constructor;
}

function replaceAll(string, query, replacement) {
  return string.split(query).join(replacement);
}

function toNumber(value) {
  var type = typeOf(value);
  if(type === "undefined" || type === "null")
    return 0;
  if(type === "number")
    return value;
  if(type === "boolean")
    return value ? 1 : 0;
  if(type === "string")
    return hash.value(value);
    
  var valueOf = value.valueOf();
  if(["undefined", "null", "number", "boolean", "string"].indexOf(typeOf(type)) !== -1)
    return toNumber(valueOf);
  
  return 0;
}

function typeOf(value) {
  var returned = Object.prototype.toString.call(value);
  return returned.substring(1, returned.length - 1).split(" ")[1].toLowerCase();
}

module.exports = {
  'findChild': findChild,
  'inherits': inherits,
  'replaceAll': replaceAll,
  'toNumber': toNumber,
  'typeOf': typeOf
};