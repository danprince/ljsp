var eval = require('./eval'),
    native = require('./native');

function transform(src) {
  // add macro transforms here
  return src;
}

module.exports = {
  // interpret code with a fresh scope each time
  interpret: function(src) {
    var scope = Object.create(native);
    var transformed = transform(src);
    var expr = JSON.parse(transformed);
    return eval(expr, scope);
  },
  // interpret code with a single, unchanging scope
  interactive: function() {
    var scope = Object.create(native);

    return function(src) {
      var transformed = transform(src);
      var expr = JSON.parse(transformed);
      return eval(expr, scope);
    };
  }
};

