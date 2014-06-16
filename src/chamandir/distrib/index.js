if (typeof exports === 'object') { // Node.js
  module.exports = ChaManDir;
} else if (typeof define === 'function' && define.amd) { // Require.JS
  define(ChaManDir);
} else {
  µ = ChaManDir;
}
