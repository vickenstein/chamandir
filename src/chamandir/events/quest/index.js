ChaManDir.Events.Quest = ChaManDir.Events.Delegator.evolve({

  initialize: function(reward, punishment) {
    this._super();
    this.tasks = [];
    this.progress = 0;
    this.reward = reward;
    this.punishment = punishment;
  },

  task: function(task) {
    this.tasks.push(task);
    return this;
  },

  start: function() {
    var _this = this;
    if (this.tasks.length > 0) {
      for (var i = 0; i < this.tasks.length; i++) {
        this.tasks[i](function(response) {
          _this.complete(response);
        }, function(error) {
          _this.failure(error);
        });
      }
    } else {
      this.complete();
    }
  },

  complete: function() {
    this.progress++;
    if (this.progress >= this.tasks.length) {
      this.done();
    }
  },

  failure: function(error) {
    this.punishment(error);
  },

  done: function() {
    this.reward();
  }


})
