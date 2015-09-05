function SpecialForm(fn) {
  fn.__isSpecialForm__ = true;
  return fn;
}

module.exports = SpecialForm;

