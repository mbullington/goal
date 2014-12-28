var assert = require('better-assert'),
    _ = require('../index.js');

describe('Collections', function() {
  it('args()', function() {
    assert(typeof _.args !== "undefined");
    assert(!(arguments instanceof Array));
    assert(_.args(arguments) instanceof Array); 
  });
  
  describe('each()', function() {
    it("iterates over Objects", function() {
      assert(typeof _.each !== "undefined");
      var obj = {
        '1': 1,
        '2': 2
      };
      
      _.each(obj, function(value, key, original) {
        assert(original === obj);
        assert(['1', '2'].indexOf(key) >= 0);
        assert(obj[key] === value);
      });
    });
    
    it("iterates over Arrays", function() {
      assert(typeof _.each !== "undefined");
      var arr = [1, 2];
      
      _.each(arr, function(key, index, original) {
        assert(original === arr);
        assert(arr.indexOf(key) === index);
        assert(arr[index] === key);
      });
    });
  });
  
  it('merge()', function() {
    assert(typeof _.merge !== "undefined");
    var a = {
      'a': 0
    };
    var b = {
      'a': 1,
      'b': 0
    };
    
    var merge = _.merge({}, a, b);
    assert(typeof merge.a !== "undefined");
    assert(typeof merge.b !== "undefined");
    assert(merge.a === 1);
    assert(_.merge({}, b, a).a == 0);
  });
});