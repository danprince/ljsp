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
  }
};

module.exports = util;

