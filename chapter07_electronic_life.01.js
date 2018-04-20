'use strict';

var plan = ["############################",
            "#o     #    #             ##",
            "#                          #",
            "#          #####           #",
            "##         #   #    ##     #",
            "###           ##     #     #",
            "#           ###      #     #",
            "#   ####                   #",
            "#   ##                     #",
            "#    #                 ### #",
            "#    #                     #",
            "############################"];

let directions = new Map();
  directions.set("n", new Vector(0,1));
  directions.set("ne", new Vector(1,1));
  directions.set("e", new Vector(1,0));
  directions.set("se", new Vector(1,-1));
  directions.set("s", new Vector(0,-1));
  directions.set("sw", new Vector(-1,-1));
  directions.set("w", new Vector(-1,0));
  directions.set("nw", new Vector(-1,1));

let directionlist = Array.from(directions.keys());

function getRandomElement(items){
  return items[Math.floor(Math.random() * items.length)]
}

function elementFromChar(legend, ch){
  /* helper, legend is a map with a char - class */
  if(ch == " ") return null;
  let element = new legend[ch]();
  element.originChar = ch;
  return element;
}

function charFromElement(element){
  return element ? element.originChar : " ";
}


function Vector(x,y){
  /* x=width, y=height */
  this.x = x;
  this.y = y;
}
let pluscnt = 0;
Vector.prototype.plus = function(otherVector){
  return new Vector(this.x + otherVector.x, this.y + otherVector.y);
}


function Grid(width, height) {
  this.space = new Array(width * height);
  this.width = width;
  this.height = height;
}
Grid.prototype.isInside = function(vector){
  return vector.x >= 0 && vector.x <= this.width
    && vector.y >= 0 && vector.y <= this.height;
}
Grid.prototype.get = function(vector){
  return this.space[this.width * vector.y + vector.x];
}
Grid.prototype.set = function(vector, value){
  this.space[this.width * vector.y + vector.x] = value;
}
// forEach has one advantage over map and filter directly on Grid.space, i
// it can return vector as side effect. So it makes sense to capsule this function.
Grid.prototype.forEach = function(f, context){
  for(let y = 0; y < this.height; y++){
    for(let x = 0; x < this.width; x++){
      let value = this.space[x + y * this.width];
      if(value != null) f.call(context, value, new Vector(x,y))
    }
  }
}


function Wall(){
  //does nothing yet
}


function World(plan, legend){
  this.legend = legend;
  this.grid = new Grid(plan[0].length, plan.length);
  plan.forEach((line, height)=>{
    for(let width = 0; width < line.length; width++){
      this.grid.set(new Vector(width, height), elementFromChar(this.legend, line.charAt(width)))
    }
  });
}
World.prototype.toString  = function(){
  let output = "";
  for(let y = 0; y < this.grid.height; y++){
    for(let x = 0; x < this.grid.width; x++){
      let element = this.grid.get(new Vector(x, y));
      output += charFromElement(element);
    }
    output += "\n"
  }
  return output;
}
// turn based game, each turn activates all active players with letAct
World.prototype.turn = function(){
  let acted = [];
  this.grid.forEach(function(cell, vector){
    if(cell.act && acted.indexOf(cell) == -1){
      acted.push(cell);
      this.letAct(cell, vector);
    }
  }, this);
}
// letAct will touch each player with a vector, called by turn()
World.prototype.letAct = function(critter, vector){
  /* Sets critter to destination when action is "move" */
  let action = critter.act(new View(this, vector));
  // console.log("letAct: ", action)
  if(action && action.type == "move"){
    //dest will be undefined when
    let dest = this.checkDestination(action, vector);
    if(dest && this.grid.get(dest)== null){
      debugger;
      this.grid.set(dest, critter);
      this.grid.set(vector, null);
    }
  }
}
World.prototype.checkDestination = function(action, vector){
  //OK; this is interesting, Haverbeke is not using a map, so he needs, hasOwnProperty and this
  // relates to the vector in action.destination, I use Map
  if(directions.has(action.direction)){
    let dest = vector.plus(directions.get(action.direction));
    if(this.grid.isInside(dest)) return dest
  }
}

function BouncingCritter(){
  this.direction = getRandomElement(directionlist)
}

BouncingCritter.prototype.act = function(view) {
  if (view.look(this.direction) != " "){
    this.direction = view.find(" ") || "s";
  }
  return {type: "move", direction: this.direction};
};

function View(world, vector){
  this.world = world;
  this.vector = vector;
}

View.prototype.look = function(cardinalDirection){
  //cardinalDirection="bad"
  let destination = this.vector.plus(directions.get(cardinalDirection));
  return this.world.grid.isInside(destination) ? charFromElement(this.world.grid.get(destination)) : "#";
}
View.prototype.find = function(ch) {
  var found = this.findAll(ch);
  if (found.length == 0) return null;
  return getRandomElement(found);
}
View.prototype.findAll = function(char){
  let found = []
  // take the current vector circle through directions and use this.vector.plus(vector from directions) to find char
  directions.forEach((value, key)=>{
    //charFromElement(this.world.grid.get(this.vector.plus(value))
    let foundChar = this.look(key);
    if(foundChar == char) found.push(key);
  });
  return found
}



let legend = {"#": Wall, "o": BouncingCritter};
let myW = new World(plan, legend);
for(let i=0;i<3;i++){
  console.log("%s. turn",i)
  myW.turn();
  console.log(myW.toString());
}



/*test code*/

/*
let myV = new Vector(2,0);
let myG = new Grid(5,5);
myG.space = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
console.log("isInside: %s", myG.isInside(myV));
console.log("is at pos x%sy%s: %s", myV.x, myV.y, myG.get(myV));
console.log("this.space: %s", myG.space)
myG.set(myV, "#");
console.log("this.space: %s", myG.space);
let myV2 = myV.plus(new Vector(2,2));
myG.set(myV2, "*");
console.log("this.space: %s", myG.space)
*/
