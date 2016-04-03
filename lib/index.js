var eval = require('./eval'),
    native = require('./native');

module.exports = {
  // interpret code with a fresh scope each time
  interpret: function(src) {
    var scope = Object.create(native);
    var expr = JSON.parse(src);
    return eval(expr, scope);
  },
  // interpret code with a single, unchanging scope
  interactive: function() {
    var scope = Object.create(native);

    return function(src) {
      var expr = JSON.parse(src);
      return eval(expr, scope);
    };
  }
};

