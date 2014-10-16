ChaManDir.Cha.Storer = ChaManDir.define({

  initialize: function() {
    this._super();
    this.stack = ChaManDir.Cha.Storer.Stack.create();
  },

  empty: function() {
    this.stash = ChaManDir.Cha.Storer.Stack.create();
    return this;
  }
});
