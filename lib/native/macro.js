function Macro(fn) {
  function macro() {
    return fn.apply(this, arguments);
  }

  macro.__isMacro__ = true;

  return macro;
}

module.exports = Macro;

