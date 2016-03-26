var SpecialForm = require('./special-form'),
    Macro = require('./macro'),
    eval = require('../eval'),
    util = require('../util');

var native = {
  print: console.log.bind(console),
  list: function() {
    return util.toArray(arguments);
  },
  def: SpecialForm(function(name, value) {
    return this[name] = eval(value, this);
  }),
  fn: SpecialForm(function(defArgs, expr) {
    var fn = function() {
      var callArgs = arguments,
          childScope = Object.create(this);

      defArgs.forEach(function(argName, index) {
        childScope[argName] = callArgs[index];
      });

      return eval(expr, childScope);
    };

    return fn;
  }),
  defn: SpecialForm(function(name, args, expr) {
    var fn = native.fn.call(this, args, expr);
    return native.def.call(this, name, fn);
  }),
  defmacro: SpecialForm(function(name, args, expr) {
    return Macro(native.fn.call(this, args, expr));
  }),
  'do': SpecialForm(function() {
    var exprs = util.toArray(arguments),
        scope = this;

    return exprs.reduce(function(_, expr) {
      return eval(expr, scope);
    }, null);
  }),
  'if': SpecialForm(function(condition, trueExpr, falseExpr) {
    var passed = eval(condition, this);
    return eval(passed ? trueExpr : falseExpr, this);
  }),
  quote: SpecialForm(function(expr) {
    return expr;
  }),
  '\'': SpecialForm(function(expr) {
    return expr;
  }),
  'expand': SpecialForm(function(expr) {
    var macro = eval(expr[0], this);
    var args = expr.slice(1);
    return native.quote(macro(args));
  }),
  'flip': Macro(function(expr) {
    return expr.reverse();
  }),
  '->': Macro(function(expr) {
    return expr.reduce(function(curr, next) {
      var f = next[0];
      var args = next.slice(1);
      return [f, curr].concat(args);
    });
  }),
  '->>': Macro(function(expr) {
    return expr.reduce(function(curr, next) {
      var f = next[0];
      var args = next.slice(1);
      return [f].concat(args, [curr]);
    });
  }),
  cond: Macro(function(expr) {
    return expr.reduce(function(curr, next) {
      // ...
    });
  })
};

module.exports = util.mixinMany(native, [
  require('./math'),
  require('./logic'),
  require('./functional'),
  require('./list')
]);

