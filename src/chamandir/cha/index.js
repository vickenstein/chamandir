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
