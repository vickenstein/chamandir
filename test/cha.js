///////////////////////////////
//create a class, and instance

µ = ChaManDir;

/* empty class */
var Pokemon1 = µ.define();
var pokemon1 = Pokemon1.create();

test("empty class", function() {
  ok(typeof pokemon1 === "object");
});

/* class with default attributes */
var Pokemon2 = µ.define({
  color: "red",
  height: 180
});
var pokemon2 = Pokemon2.create();

test("class with default attributes", function() {
  ok(pokemon2.color === "red");
  ok(pokemon2.height === 180);
});

/* class with methods */
var Pokemon3 = µ.define({
  color: "red",
  get_color: function() {
    return this.color;
  }
});
var pokemon3 = Pokemon3.create();
test("class with methods", function() {
  ok(pokemon3.get_color() === "red");
});

/* class with initialize */
var Pokemon4 = µ.define({
  initialize: function(color) {
    this.color = color;
  }
});
var pokemon4 = Pokemon4.create("red");

test("class with initialize", function() {
  ok(pokemon4.color === "red");
});

/* extending a class */
var Pokemon5 = Pokemon2.evolve({
  get_color: function() {
    return this.color;
  }
})
var pokemon5 = Pokemon5.create("red", 180);

test("extended class", function() {
  ok(pokemon5.get_color() === "red");
});

/* extending a class and calling super */
var Pokemon6 = Pokemon4.evolve({
  get_color: function() {
    return this.color;
  },
  initialize: function() {
    this._super();
  }
});
var pokemon6 = Pokemon6.create("red", 180);

test("extended class calling super", function() {
  ok(pokemon6.get_color() === "red");
});

/* extending a class and extend again calling super */
var Pokemon7 = Pokemon4.evolve({
  get_color: function() {
    return this.color;
  }
}).evolve({
  initialize: function() {
    this._super();
  }
});
var pokemon7 = Pokemon7.create("red", 180);

test("extending a class and extend again calling super", function() {
  ok(pokemon7.get_color() === "red");
});

/* extending a class and extend again chaining super */
var Pokemon8 = Pokemon4.evolve({
  initialize: function() {
    this._super();
  }
}).evolve({
  initialize: function() {
    this._super();
  }
});
var pokemon8 = Pokemon8.create("red", 180);

test("extending a class and extend again chaining super", function() {
  ok(pokemon8.color === "red");
});

/* creating a class that adopt from another class and adapt to another class */
var Pokemon9 = Pokemon3.adopt(Pokemon2);
var pokemon9 = Pokemon9.adapt(Pokemon4).create("blue");

test("creating a class that adopt from another class and adapt to another class", function() {
  ok(pokemon9.get_color() === "blue");
  ok(pokemon9.height === 180);
});

/* creating a class that has gone through a lot of changes */
var Pokemon10 = Pokemon3.adopt(Pokemon2).adopt(Pokemon4).evolve({
  color: "blue",
  height: 150
}).adopt(Pokemon1).evolve({
  initialize: function() {
    this._super();
  }
});
var pokemon10 = Pokemon10.create("orange");

test("creating a class that has gone through a lot of changes", function() {
  ok(pokemon10.get_color() === "orange");
  ok(pokemon10.height === 150);
})


