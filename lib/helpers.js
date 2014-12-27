function findChild(obj, pathArray) {
  pathArray.forEach(function(path) {
    if(!obj.hasOwnProperty(path))
      throw "findChild: Object does not have property!\n" + obj;
    obj = obj[path];
  });
  return obj;
}

function removeWhere(array, callback) {
  var returned = array;
  array.forEach(function(value) {
    if(callback(value))
      returned = returned.splice(0, array.indexOf(value)).concat(returned.splice(array.indexOf(value) + 1));
  });
  return returned;
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
  return returned.substring(returned.indexOf(" ") + 1, returned.indexOf("]")).toLowerCase();
}

module.exports = {
  'findChild': findChild,
  'removeWhere': removeWhere,
  'replaceAll': replaceAll,
  'toNumber': toNumber,
  'typeOf': typeOf
};