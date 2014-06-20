ChaManDir
=========

ChaManDir is a js library to help with OO development and abstract from prototype. 
It also have some predefined base classes to extend from. e.g eventing, getter/setter

µ is the prefered namespace for chamandir, though ChaManDir is currently the global namespace
```
µ = ChaManDir;
```
If prefer to use require.js with chamandir, configure:
```
require.config({
  path: {
    'chamandir',  'path to chamandir distrib version, or minified'
  }
})

require(['chamandir'], function(µ) {
  var Klass = µ.define();
});
```
If to use in node.js, configure package.json -> npm install, and: 
```
var µ = require('chamandir');
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
ChaManDir classes are design to not have methods attached the class constructor, but the initialize method is always called on creation.
```
var pokemon = PokemonBreeder.create({
  name:    "charmander",
  color:   "red",
  element: "fire"
);
pokemon.get_color(); // return "red"
pokemon.element; // return "fire"
```
ChaManDir classes are designed to evolve with ability of super
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
ChaManDir classes are able to adopt ability from other ChaManDir classes
```
var FireBreath = µ.define({
  fire_breath: function() {
    return "so much heat!";
  }
});
var ElitePokemonWithFireBreathBreeder = ElitePokemonBreeder.adopt(FireBreath);
```
or when you go fire breath you can't go back
```
ElitePokemonBreeder.adapt(FireBreath);
```

ChaManDir also has a comprehesive event system
```
var EventingElitePokemonBreeder = ElitePokemonBreeder.adapt(µ.Events.Delegator);
var pokemon = EventingElitePokemonBreeder.create({
  name:     "charmander",
  color:    "red",
  element:  "fire",
  temper:   "shy"
});
pokemon.bind('eat', function(){
  console.log(this.name + " is getting happier");
});
pokemon.bind('eat.start', function(){
  console.log(this.name + " just found food");
});
pokemon.trigger('eat'); // log 'charmander just found food'
                        // log 'charmander is getting happier'
pokemon.trigger('eat.start'); // log 'charmander just found food'
```
