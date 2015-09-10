var util = require('../util');

var logic = {
  and: function() {
    var terms = util.toArray(arguments);
    return terms.reduce(function(p, q) {
      return p && q;
    });
  },
  or: function() {
    var terms = util.toArray(arguments);
    return terms.reduce(function(p, q) {
      return p || q;
    });
  },
  not: function(p) {
    return !p;
  }
};

module.exports = logic;

