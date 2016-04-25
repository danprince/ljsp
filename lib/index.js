var evaluate = require('./evaluate');
var native = require('./native');

//var parens = require('./macros/parens');
//var quote = require('./macros/quote');
//var comma = require('./macros/comma');

function transform(src) {
  // add macro transforms here
  return src;
}

module.exports = {
  // interpret code with a fresh scope each time
  interpret: function(src, globals) {
    var scope = Object.assign(
      Object.create(native),
      globals
    );
    var transformed = transform(src);
    var expr = JSON.parse(transformed);
    return evaluate(expr, scope);
  },
  // interpret code with a single, unchanging scope
  interactive: function() {
    var scope = Object.create(native);

    return function(src) {
      var transformed = transform(src);
      var expr = JSON.parse(transformed);
      return evaluate(expr, scope);
    };
  }
};

