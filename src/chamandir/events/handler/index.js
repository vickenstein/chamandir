ChaManDir.Events.Handler = ChaManDir.define({

  initialize: function() {
    this.handlers = {};
    this.events = [];
  },

  sub_events: function(event_name) {
    return (!event_name)? [] : (event_name instanceof Array)? event_name : event_name.split(".");
  },

  bind: function(event_name, callback, context) {
    var sub_events = this.sub_events(event_name);
    var sub_event = sub_events.shift();
    if (!sub_event) {
      this._bind(callback, context);
    } else {
      if (!this.handlers[sub_event]) this.handlers[sub_event] = ChaManDir.Events.Handler.create();
      this.handlers[sub_event].bind(sub_events, callback, context);
    }
  },

  _bind: function(callback, context) {
    this.events.push(ChaManDir.Events.Event.create(callback, context));
  },

  unbind: function(event_name) {
    var sub_events = this.sub_events(event_name);
    var sub_event = sub_events.shift();
    if (sub_events.length) {
      if (this.handlers[sub_event]) this.handlers[sub_event].unbind(sub_events)
    } else {
      delete this.handlers[sub_event];
    }
  },

  trigger: function(event_name, context) {
    var sub_events = this.sub_events(event_name);
    var sub_event = sub_events.shift();
    if (sub_event && this.handlers[sub_event]) {
      this.handlers[sub_event].trigger(sub_events, context);
    } else {
      this._trigger(context);
    }
  },

  _trigger: function(context) {
    for (var i = 0; i < this.events.length; i++) {
      this.events[i].trigger(context);
    }
    for (var i in this.handlers) {
      this.handlers[i].trigger([], context);
    }
  }
});
