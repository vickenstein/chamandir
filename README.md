ChaManDir
=========

ChaManDir's vision is an all inclusive js library minus dom manipulation / ajax handling 

Currently only the OO development portion of the library is submit via github. Others are work in progress, and when unit test are done will be added as well.

µ is the prefered namespace for chamandir, though ChaManDir is currently the global namespace
```
µ = ChaManDir;
```
To define a class use
```
var PokemonBreeder = µ.define({
  initialize: function(options){
    this.name = options.name;
    this.color = options.color;
    this.element = options.element;
  },
  get_color: function(){
    return this.color;
  }
});
```
ChaManDir class are design to not have methods attached the class constructor, but the initialize method is always called on creation.
```
var pokemon = PokemonBreeder.create({
  name:    "charmander",
  color:   "red",
  element: "fire"
);
pokemon.get_color(); // return "red"
pokemon.element; // return "fire"
```
ChaManDir class are designed to evolve with ability of super
```
var ElitePokemonBreeder = PokemonBreeder.evolve({
  initialize: function(options){
    this._super();
    this.temper = options.temper;
  }
});
var pokemon = ElitePokemonBreeder.create({
  name:     "charmander",
  color:    "red",
  element:  "fire",
  temper:   "shy"
});
pokemon.get_color(); // return "red"
pokemon.temper; // return "shy"
```
