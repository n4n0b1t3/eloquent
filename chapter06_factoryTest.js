/*
UnderlinedCell = winWidth +


function TextCell(text){
  this.text = text.split("\n");
}

TextCell.prototype.minWidth = function(){
  //this.text is always and array, possibly with many entries
  let result = this.text.reduce((max, current) => Math.max(max, current.length), 0);
  return result;
}

TextCell.prototype.minHeight = function(){
  return this.text.length;
}

TextCell.prototype.draw = function(width, height){
  // return an array with cell content formatted as strings, one array element per line
  let result = [];
  // console.log("in TC.pt.draw: %s %s", width, height)
  for(let i = 0; i < height; i++){
    var line = this.text[i] || "";
    result.push(line + repeat(" ", width - line.length))
  }
  return result
}

*/
const minWidth = (state) => ({
  minWidth: () => state.text.reduce((max, current) => Math.max(max, current.length), 0)
})

function minWidth(state){
  return
}

const draw = (state) => ({
  draw: () => state.text
})

const TextCell = (text) => {
  let state = {
    text,
    meaningOfLife: 42
  }

  return Object.assign(
    {},
    minWidth(state),
    draw(state)
    /*,
    minHeight(state),
    */
  )
}


const myCell = TextCell("mytext")

console.log(myCell.draw())
