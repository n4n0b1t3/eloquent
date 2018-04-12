function Vector(x,y){
  this.x = x;
  this.y = y;
}

function Grid(width, height){
  this.space = new Array(width * height);
  this.width = width;
  this.height = height;
}

Grid.prototype.get = function(vector){
  return this.space[(vector.x * this.width) + vector.y];
}

Grid.prototype.set = function(vector, value) {
  let index = (vector.x * this.width) + vector.y;
  this.space[index] = value;
}

Grid.prototype.draw = function(){
  let output = [];
  for(let i = 0; i < this.height; i++){
    let startpoint = this.width * i;
    let endpoint   = this.width * (i + 1);
    let slice = this.space.slice(startpoint, endpoint);
    output.push(slice.join(""))
  }
  return output.join("\n")
}

let myGrid = new Grid(10,5);
/* easy version
myGrid.space = "###########   °  v ##  v °   ## °     v###########".split("");
*/

// using Grid setter
let mapAsString = "###########   °  v ##  v °   ## °     v###########"
let mapAsArray = mapAsString.split("");
mapAsArray.map((element, index) => {
  let x = Math.floor(index / myGrid.width);
  let y = index - x * myGrid.width;
  //console.log(`${x},${y}: ${element}`)
  return myGrid.set(new Vector(x,y), element)
});

console.log(myGrid.draw())
console.log("vector test: <%s>", myGrid.get(new Vector(2,5)))
