var SpecialForm = require('./special-form'),
    Macro = require('./macro'),
    evaluate = require('../evaluate'),
    util = require('../util');

var native = {
  print: console.log.bind(console),
  list: function() {
    return util.toArray(arguments);
  },
  def: SpecialForm(function(name, value) {
    return this[name] = evaluate(value, this);
  }),
  fn: SpecialForm(function(defArgs, expr) {
    var fn = function() {
      var callArgs = arguments,
          childScope = Object.create(this);

      defArgs.forEach(function(argName, index) {
        childScope[argName] = callArgs[index];
      });

      return evaluate(expr, childScope);
    };

    return fn;
  }),
  defn: SpecialForm(function(name, args, expr) {
    var fn = native.fn.call(this, args, expr);
    return native.def.call(this, name, fn);
  }),
  defmacro: SpecialForm(function(name, args, expr) {
    var macro = Macro(native.fn.call(this, args, expr));
    return native.def.call(this, name, macro);
  }),
  'do': SpecialForm(function() {
    var exprs = util.toArray(arguments),
        scope = this;

    return exprs.reduce(function(_, expr) {
      return evaluate(expr, scope);
    }, null);
  }),
  'if': SpecialForm(function(condition, trueExpr, falseExpr) {
    var passed = evaluate(condition, this);
    return evaluate(passed ? trueExpr : falseExpr, this);
  }),
  quote: SpecialForm(function(expr) {
    return expr;
  }),
  'expand': SpecialForm(function(expr) {
    var macro = evaluate(expr[0], this);
    var args = expr.slice(1);
    return native.quote(macro(args));
  }),
  '->a': Macro(function(expr) {
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
  '.': SpecialForm(function(host, prop) {
    return host[prop];
  })
};

module.exports = Object.assign(
  {},
  native,
  require('./math'),
  require('./logic'),
  require('./functional'),
  require('./list')
);

