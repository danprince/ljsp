var util = {
  toArray: function(arrayLike) {
    return Array.prototype.slice.call(arrayLike);
  },
  balancedParens: function(code, open, close) {
    open = open || '[';
    close = close || ']';

    var balance = {};
    balance[open] = 1;
    balance[close] = -1;

    return code
      .split('')
      .map(function(symbol) {
        return balance[symbol] || 0;
      })
      .reduce(function(total, num) {
        return total + num;
      }, 0) === 0;
  }
};

module.exports = util;

