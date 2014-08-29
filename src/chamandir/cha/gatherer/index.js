ChaManDir.Cha.Gatherer = ChaManDir.define({

  initialize: function() {
    this._super();
    this.stash = ChaManDir.Cha.Gatherer.Stash.create();
  },

  gather: function(index, context) {
    if (this.stash.have(index)) {
      return this.stash[index];
    } else if (this[index] && typeof this[index] === "function") {
      return this.stash.store(index, this[index].apply(this, context));
    } else {
      throw new Error(index + " method is missing!!!");
    }
  },

  ditch: function(index) {
    this.stash.release(index);
    return this;
  },

  empty: function() {
    this.stash = ChaManDir.Cha.Gatherer.Stash.create();
    return this;
  },

  reset: function(index, context) {
    this.ditch(index).gather(index, context)
  }
})
