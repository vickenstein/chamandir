function Base() {
  this.__super = {};
  this._method = [];
  this._arguments = [];
  if (this.initialize) this.initialize.apply(this, arguments);
};

Base.prototype = {

  _super: function() {
    var _super = this.__super[this._method[0]] || this._super_;
    var method;
    while (!method && _super) {
      method = _super[this._method[0]];
      _super = _super._super_;
      this.__super[this._method[0]] = _super;
    };
    if (method) {
      return method.apply(this, this._arguments[0]);
    } else {
      return undefined;
    };
  }
};

ChaManDir.Cha.Base = Base;
