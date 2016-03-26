function eval(rawExpr, scope) {
  scope = scope || {};

  // return early if we can't evaluate
  if(!(rawExpr instanceof Array)) {
    return scope[rawExpr] || rawExpr;
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
  var args = expr.slice(1);

  // evaluate the new expression which is the result of
  // re-arranging the arguments to the macro
  if(fn.__isMacro__) {
    return eval(fn(args), scope);
  }

  // evaluate the arguments
  var evaluatedArgs = args.map(function(arg) {
    // don't evaluate if the function is a special form!
    if(arg instanceof Array && !(fn.__isSpecialForm__)) {
      return eval(arg, scope);
    } else {
      return arg;
    }
  });

  return fn.apply(scope, evaluatedArgs);
}

module.exports = eval;

