var types = {
  type: function(value) {
    return typeof value;
  },
  'object?': function(obj) {
    return typeof obj === 'object';
  },
  'array?': function(arr) {
    return arr instanceof Array;
  },
  'number?': function(num) {
    return typeof num === 'number';
  },
  'string?': function(str) {
    return typeof str === 'string';
  },
  'undefined?': function(undef) {
    return typeof undef === 'undefined';
  }
};

module.exports = types;

