function quote(src) {
  return src.replace(
    /([a-zA-Z_\$\-\<\>\+\*\/]+[a-zA-Z0-9_\$\?\-\<\>\+\*\/]*)/g,
    function(match) {
      return '"' + match + '"';
    });
}

module.exports = quote;
