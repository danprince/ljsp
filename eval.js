function eval(rawExpr, scope) {
  scope = scope || {};

  // return early if we can't evaluate
  if(!(rawExpr instanceof Array)) {
    return rawExpr;
  }

  // resolve all variable names
  var expr = rawExpr.map(function(symbol) {
    if(typeof symbol === 'string' && symbol in scope) {
      return scope[symbol];
    } else {
      return symbol;
    }
  });

  var fn = expr[0];

  // evaluate the arguments
  var args = expr
    .slice(1)
    .map(function(arg) {
      // don't evaluate if the function is a special form!
      if(arg instanceof Array && !(fn.__isSpecialForm__)) {
        return eval(arg, scope);
      } else {
        return arg;
      }
    });

  return fn.apply(scope, args);
}

module.exports = eval;

