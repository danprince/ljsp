function parens(src) {
  return src
    .replace(/\(/g, '[')
    .replace(/\)/g, ']');
}

module.exports = parens;
