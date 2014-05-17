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
