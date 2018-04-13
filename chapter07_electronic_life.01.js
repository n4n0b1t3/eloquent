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

function Vector(x,y){
  this.x = x;
  this.y = y;
}

Vector.prototype.plus = function(otherVector){
  new Vector(this.x + otherVector.x, this.y + otherVector.y);
  console.log(this.x, otherVector.x, this.y, otherVector.y);

}

/*test code*/
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
