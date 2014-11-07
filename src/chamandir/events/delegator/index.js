ChaManDir.Events.Delegator = ChaManDir.define({

  initialize: function() {
    this._super();
    this.handler = ChaManDir.Events.Handler.create();
    this.hooks();
  },

  hooks: function() {

  },

  bind: function(event_name, callback, context) {
    var context = context || this;
    this.handler.bind(event_name, callback, context);
  },

  unbind: function(event_name) {
    this.handler.unbind(event_name);
  },

  trigger: function(event_name, context) {
    this.handler.trigger(event_name, context);
  }
})
