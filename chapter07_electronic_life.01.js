var plan = ["############################",
            "#      #    #      o      ##",
            "#                          #",
            "#          #####           #",
            "##         #   #    ##     #",
            "###           ##     #     #",
            "#           ###      #     #",
            "#   ####                   #",
            "#   ##       o             #",
            "# o  #         o       ### #",
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
Vector.prototype.plus = function(otherVector){
  //console.log("plus: %s %s %s %s", this.x, otherVector.x, this.y, otherVector.y);
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
      value = this.space[x + y * this.width];
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
  console.log("letAct: ", action)
}


function BouncingCritter(){
  this.direction = getRandomElement(directionlist)
}
BouncingCritter.prototype.act = function(view){
  // must set direction and return object
  //console.log("BC.act: ", view.look(this.direction));
  if(view.look(this.direction) != " "){
    this.direction = view.find(" ") || "s";
  }
  return {type: "move", direction: this.direction}
}

BouncingCritter.prototype.act = function(view) {
  if (view.look(this.direction) != " ")
    this.direction = view.find(" ") || "s";
  return {type: "move", direction: this.direction};
};

function View(world, vector){
  this.world = world;
  this.vector = vector;
}
View.prototype.look = function(cardinalDirection){
  /* returns the character or null at destination  */
  let destination = this.vector.plus(directions.get(cardinalDirection));
  // console.log("look 1:", destination, this.world.grid.get(destination));
  return this.world.grid.isInside(destination) ? charFromElement(this.world.grid.get(destination)) : "#";
  // console.log("look 2: ", myReturn);
}



let legend = {"#": Wall, "o": BouncingCritter};
let myW = new World(plan, legend);
console.log(myW.turn());



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
