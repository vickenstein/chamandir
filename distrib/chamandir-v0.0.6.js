var chamandir = function () {};

chamandir.prototype = {

  settings: {},

  // Clone an identical copy of constructor
  clone: function(cha) {
    function Clone() {
      Cha.apply(this, arguments);
    }
    Clone.prototype = new cha;
    return Clone;
  },

  // Clone an identical copy of constructor and apply some new changes, store replaced methods in _super_
  evolve: function(cha, mutations) {

    var Clone = this.clone(cha);
    var _super_ = (Clone.prototype["_super_"])? { _super_: Clone.prototype["_super_"] } : {};
    for (var i in mutations) {
      if (typeof mutations[i] === "function" && this.possess(Clone, i) && i !== "_super") {
        _super_[i] = Clone.prototype[i];
        Clone.prototype[i] = this._super(i, mutations[i]);
      } else {
        Clone.prototype[i] = mutations[i];
      }
    }
    Clone.prototype._super_ = _super_;
    return Clone;
  },

  // Generate a wrap for a function that replaces a super
  _super: function(method, func) {
    return function() {
      this._method = method;
      this._arguments = arguments;
      var ret = func.apply(this, arguments);
      delete this._method;
      delete this._arguments;
      delete this.__supper__;
      return ret;
    }
  },

  // Check if a method exists in prototype of _super_
  possess: function(cha, method) {
    var _super = cha.prototype;
    while (_super) {
      if (_super[method]) return true;
      _super = _super._super;
    }
    return false;
  },

  // Helper to generate new Cha
  define: function(properties) {

    return new ChaManDir.Cha(properties);
  },

  // Helper for log
  log: function(title, message) {

    console.log(title);
    if (message) {
      console.log(message);
    }
    console.log("######################");
  }
}

ChaManDir = new chamandir();

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

  adopt: function(cha) {
    var new_cha = new ChaManDir.Cha;
    new_cha._constructor = this._adopt(cha);
    return new_cha;
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
  }
})

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

function Events(){}

Events.prototype = {

}

ChaManDir.Events = new Events;


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

if (typeof exports === 'object') { // Node.js
  module.exports = ChaManDir;
} else if (typeof define === 'function' && define.amd) { // Require.JS
  define(ChaManDir);
} else {
  µ = ChaManDir;
}
