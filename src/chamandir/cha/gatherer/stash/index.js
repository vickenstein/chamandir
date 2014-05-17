ChaManDir.Cha.Gatherer.Stash = ChaManDir.define({

  initialize: function() {
    this.exists = {};
  },

  have: function(index) {
    return (this.exists[index])? true : false;
  },

  store: function(index, data) {
    this[index] = data;
    this.exists[index] = true;
    return data;
  },

  release: function(index) {
    delete this[index];
    this.exists[index] = false;
    return this;
  }
})
