function comma(src) {
  return src.replace(/ +/g, function(match) {
    return ',' + match;
  });
}

module.exports = comma;
