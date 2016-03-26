var util = require('../util'),
    types = require('./types');

var functional = {
  maybe: function(val, defaults) {
    if(val === undefined || val === null) {
      return defaults;
    }
    return val;
  },
  maybef: function(f, defaults) {
    return function() {
      var ret = f.apply(this, arguments);
      return functional.maybe(ret, defaults);
    };
  },
  apply: function(fn, args) {
    return fn.apply(this, args);
  },
  partial: function(fn) {
    var partialArgs = util.toArray(arguments).slice(1);

    return function() {
      var callArgs = util.toArray(arguments),
          args = partialArgs.concat(callArgs);
      return fn.apply(this, args);
    }.bind(this);
  },
  curry: function(fn) {
    return function curried() {
      var args = util.toArray(arguments);

      if(args.length > fn.length) {
        return fn.apply(this, args);
      } else {
        return functional.partial(curried, args);
      }
    };
  },
  memoize: function(fn) {
    var cache = [];

    var memoized = function() {
      var args = util.toArray(args),
          containsObj = functional.any(types['object?']);

      if(containsObj) {
        console.warn('Objects can\'t be memoized!');
        return fn.apply(this, args);
      }

      return cache[args.toString()] = fn.apply(this, args);
    };

    Object.defineProperties(memoized, {
      name: { value: '[memoized]' + fn.name },
      length: { value: fn.length }
    });

    return memoized;
  }
};

module.exports = functional;

