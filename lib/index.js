var eval = require('./eval'),
    native = require('./native');

module.exports = {
  // interpret code with a fresh scope each time
  interpret: function(expr) {
    return eval(expr, Object.create(native));
  },
  // interpret code with a single, unchanging scope
  interactive: function() {
    var scope = Object.create(native);

    return function(expr) {
      return eval(expr, scope);
    };
  }
};

