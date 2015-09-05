var util = require('../util');

var math = {
  '=': function() {
    var terms = util.toArray(arguments),
        p = terms[0];

    return terms.reduce(function(equal, q) {
      return equal && (q === p);
    }, true);
  },
  '+': function() {
    var ns = util.toArray(arguments);
    return ns.reduce(function(a, b) {
      return a + b;
    }, 0);
  },
  '-': function() {
    var ns = util.toArray(arguments);
    return ns.reduce(function(a, b) {
      return a - b;
    });
  },
  '*': function() {
    var ns = util.toArray(arguments);
    return ns.reduce(function(a, b) {
      return a * b;
    }, 1);
  },
  '/': function() {
    var ns = util.toArray(arguments);
    return ns.reduce(function(a, b) {
      return a * b;
    });
  },
  '<': function(a, b) {
    return a < b;
  },
  '<=': function(a, b) {
    return a <= b;
  },
  '>': function(a, b) {
    return a > b;
  },
  '>=': function(a, b) {
    return a >= b;
  }
};

module.exports = math;

