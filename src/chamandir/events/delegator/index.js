ChaManDir.Events.Delegator = ChaManDir.define({

  initialize: function() {
    this._super();
    this.handler = ChaManDir.Events.Handler.create();
  },

  bind: function(event_names, callback, context) {
    var context = context || this;
    this.handler.bind(event_names, callback, context);
  },

  unbind: function(event_names) {
    this.handler.unbind(event_names);
  },

  trigger: function(event_names, context) {
    this.handler.trigger(event_names, context);
  }
})
