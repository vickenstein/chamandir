///////////////////////////////
//gather and store info for retreival

µ = ChaManDir;

//create a class with gatherer
var Pokemon1 = µ.define({

  initialize: function(width, height) {
    this.width = width;
    this.height = height;
  },

  area: function() {
    return this.width * this.height;
  }
}).adapt(µ.Cha.Gatherer);

var pokemon1 = Pokemon1.create(5, 10);

var area1 = pokemon1.gather("area");
pokemon1.width = 10;
var area2 = pokemon1.gather("area");
var area3 = pokemon1.ditch("area").gather("area");
pokemon1.width = 100;
var area4 = pokemon1.empty().gather("area");
pokemon1.gather('color', 'red');


test("basic gatherer", function() {
  ok(area1 === 50);
  ok(area2 === 50);
  ok(area3 === 100);
  ok(area4 === 1000);
  ok(pokemon1.gather('color') === 'red');
});


