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

function Vector(x,y){
  /*
  x=width, y=height
  */
  this.x = x;
  this.y = y;
}

Vector.prototype.plus = function(otherVector){
  new Vector(this.x + otherVector.x, this.y + otherVector.y);
  console.log(this.x, otherVector.x, this.y, otherVector.y);
}

let directions = new Map();
  directions.set("n", new Vector(0,1));
  directions.set("ne", new Vector(1,1));
  directions.set("e", new Vector(1,0));
  directions.set("se", new Vector(1,-1));
  directions.set("s", new Vector(0,-1));
  directions.set("sw", new Vector(-1,-1));
  directions.set("w", new Vector(-1,0));
  directions.set("nw", new Vector(-1,1));


function getRandomElement(items){
  return items[Math.floor(Math.random() * items.length)]
}

let directionlist = Array.from(directions.keys());

function BouncingCritter(){
  this.direction = getRandomElement(directionlist)
}

BouningCritter.prototype.act = function(){

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
  this.space[this.width * vector.y + vector.x];
}

Grid.prototype.set = function(vector, value){
  this.space[this.width * vector.y + vector.x] = value;
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
