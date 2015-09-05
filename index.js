var eval = require('./eval'),
    native = require('./native');

module.exports = {
  interpret: function(expr) {
    return eval(expr, Object.create(native));
  },
  interactive: function() {
    var scope = Object.create(native);

    return function(expr) {
      return eval(expr, scope);
    };
  }
};

