///////////////////////////////
//create events, and trigger them


µ = ChaManDir;

// creating a class and extend it with µ.Events.Delegator
var Pokemon = µ.define({
  initialize: function(color, height) {
    this.color = color;
    this.height = height;
  }
});
var Pokemon = Pokemon.adapt(µ.Events.Delegator).evolve({
  power_points: 25,
  attack: function() {
    this.trigger("attack");
    return this;
  },
  initialize: function() {
    this._super();
    this.bind("attack", function(event) {
      this.power_points -= 1;
    });
  }
});
var pokemon = Pokemon.create("red", 180);
pokemon.attack();

test("creating a class and extend it with Events.Delegator", function() {
  ok(pokemon.color === "red");
  ok(pokemon.height === 180);
  ok(pokemon.power_points === 24);
});

// testing unbinding on class
pokemon.unbind("attack");
pokemon.attack().attack();

test("testing unbinding on class", function() {
  ok(pokemon.power_points === 24);
});

// assigning sub events
var Pokemon = Pokemon.evolve({
  health_points: 30,
  initialize: function() {
    this._super();
    this.bind("attack.strong", function() {
      this.power_points -= 1;
    });
    this.bind("attack.strong.weak", function() {
      this.power_points += 1;
    });
    this.bind("attack.heal", function() {
      this.health_points += 1;
    });
  },
  weak_attack: function() {
    this.trigger("attack.strong.weak");
  },
  strong_attack: function() {
    this.trigger("attack.strong");
  },
  heal: function() {
    this.trigger("attack.heal");
  }
});
var pokemon2 = Pokemon.create("blue", 180);
pokemon2.attack();

test("assigning sub events", function() {
  ok(pokemon2.power_points === 24);
  ok(pokemon2.health_points === 31);
});

// triggering only sub events
var pokemon3 = Pokemon.create("orange", 150);
pokemon3.heal();

test("triggering only sub events", function() {
  ok(pokemon3.power_points === 25);
  ok(pokemon3.health_points === 31);
});

// triggering only sub events
var pokemon4 = Pokemon.create("gray", 140);
pokemon4.strong_attack();

test("triggering only sub events", function() {
  ok(pokemon4.power_points === 25);
  ok(pokemon4.health_points === 30);
});

// triggering only sub sub events
var pokemon5 = Pokemon.create("black", 160);
pokemon5.weak_attack();

test("triggering only sub sub events", function() {
  ok(pokemon5.power_points === 26);
  ok(pokemon5.health_points === 30);
});

var pokemon6 = Pokemon.create("legendary", 130);
pokemon6.bind("attack", function() {
  this.attacked = true;
});
pokemon6.bind("retreat", function() {
  this.retreated = true;
});
pokemon6.bind("jump", function() {
  this.jumped = true;
})
pokemon6.trigger("retreat");
pokemon6.trigger("poop");
test("multiple events", function() {
  ok(pokemon6.retreated === true);
  ok(pokemon6.attacked !== true);
  ok(pokemon6.jumped !== true);
});
