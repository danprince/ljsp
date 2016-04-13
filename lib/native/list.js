var functional = require('./functional');

var list = {
  head: function(list) {
    return list[0];
  },
  tail: function(list) {
    return list.splice(1);
  },
  init: function(list) {
    return list.slice(0, list.length - 1);
  },
  last: function(list) {
    return list[list.length - 1];
  },
  nth: function(list, n) {
    return list[n];
  },
  reverse: function(list) {
    return Object.assign([], list).reverse();
  },
  any: function(coll, pred) {
    return coll.filter(pred).length > 0;
  },
  every: function(coll, pred) {
    return coll.filter(pred).length === coll.length;
  },
  conj: function(coll, item) {
    return coll.concat([item]);
  },
  concat: function(coll, more) {
    return coll.concat(more);
  },
  map: function(f, coll) {
    return coll.map(f);
  },
  filter: function(f, coll) {
    return coll.filter(f);
  },
  reduce: function(f, val, coll) {
    return coll.reduce(f, val);
  }
};

module.exports = list;
