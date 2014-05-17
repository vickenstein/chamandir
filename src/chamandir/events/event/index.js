ChaManDir.Events.Event = ChaManDir.define({

  initialize: function(callback, context) {
    this.callback = callback;
    this.requestor = context;
  },

  trigger: function(context) {
    this.context = context;
    this.callback.call(this.requestor, this);
    delete this.context;
  }
});
