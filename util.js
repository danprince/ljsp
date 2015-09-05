var util = {
  toArray: function(arrayLike) {
    return Array.prototype.slice.call(arrayLike);
  },
  mixin: function(host, mixin) {
    Object.keys(mixin).forEach(function(key) {
      host[key] = mixin[key];
    });

    return host;
  },
  mixinMany: function(host, mixins) {
    mixins.forEach(function(mixin) {
      Object.keys(mixin).forEach(function(key) {
        host[key] = mixin[key];
      });
    });

    return host;
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

