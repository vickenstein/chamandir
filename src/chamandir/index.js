var chamandir = function () {};

chamandir.prototype = {

  settings: {},

  // Clone an identical copy of constructor
  clone: function(cha) {
    function Clone() {
      Cha.apply(this, arguments);
    }
    Clone.prototype = new cha;
    return Clone;
  },

  // Clone an identical copy of constructor and apply some new changes, store replaced methods in _super_
  evolve: function(cha, mutations) {

    var Clone = this.clone(cha);
    var _super_ = (Clone.prototype["_super_"])? { _super_: Clone.prototype["_super_"] } : {};
    for (var i in mutations) {
      if (typeof mutations[i] === "function" && this.possess(Clone, i) && i !== "_super") {
        _super_[i] = Clone.prototype[i];
        Clone.prototype[i] = this._super(i, mutations[i]);
      } else {
        Clone.prototype[i] = mutations[i];
      }
    }
    Clone.prototype._super_ = _super_;
    return Clone;
  },

  // Generate a wrap for a function that replaces a super
  _super: function(method, func) {
    return function() {
      this._method = method;
      this._arguments = arguments;
      var ret = func.apply(this, arguments);
      delete this._method;
      delete this._arguments;
      delete this.__supper__;
      return ret;
    }
  },

  // Check if a method exists in prototype of _super_
  possess: function(cha, method) {
    var _super = cha.prototype;
    while (_super) {
      if (_super[method]) return true;
      _super = _super._super;
    }
    return false;
  },

  // Helper to generate new Cha
  define: function(properties) {

    return new ChaManDir.Cha(properties);
  },

  // Helper for log
  log: function(title, message) {

    console.log(title);
    if (message) {
      console.log(message);
    }
    console.log("######################");
  }
}

ChaManDir = new chamandir();
