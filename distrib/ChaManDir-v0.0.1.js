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
    var _super_ = {
      _super_: Clone.prototype["_super_"] || null
    };
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
      console.log(method, func.toString());
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

function Cha(properties) {
  this._constructor = ChaManDir.evolve(Base, properties);
};

Cha.prototype = {

  create: function(){
    var cha = new this._constructor();
    if (cha.initialize) cha.initialize.apply(cha, arguments);
    return cha;
  },

  evolve: function(properties) {
    var cha = new ChaManDir.Cha;
    cha._constructor = ChaManDir.evolve(this._constructor, properties);
    return cha;
  },

  adopt: function(cha, mutable) {
    if (mutable) {
      return this.adapt(cha);
    } else {
      var new_cha = new ChaManDir.Cha;
      new_cha._constructor = this._adopt(cha);
      return new_cha;
    }
  },

  _adopt: function(cha) {
    var prototype = (typeof cha === "function")? cha.prototype : cha._constructor.prototype;
    return ChaManDir.evolve(this._constructor, prototype);
  },

  adapt: function(cha) {
    var new_constructor = this._adopt(cha);
    this._constructor = new_constructor;
    return this;
  }
}

ChaManDir.Cha = Cha;

function Base() {
  if (this.initialize) this.initialize.apply(this, arguments);
};

Base.prototype = {

  _super: function() {
    var _super = this.__supper__ || this._super_;
    var method;
    while (!method && _super) {
      method = _super[this._method];
      _super = _super._super_;
      this.__supper__ = _super;
    };
    if (method) {
      return method.apply(this, this._arguments);
    } else {
      return undefined;
    };
  }
};

ChaManDir.Cha.Base = Base;