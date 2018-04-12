function repeat(char, reps){
  let output = ""
  for(let i = 0; i <= reps; i++){
    output += char
  }
  return output
}

function getHeight() { return this.text.length; }
//const getHeight = (state) => ({ state.text.length })
function getWidth() {
  return this.text.reduce(
    (accumulator, current) => Math.max(accumulator, current.length),0);
}

function draw() { return this.text.join(" | "); }

const TextCell = (text) => {
  let state = {
    text: text.split("\n")
  }

  state.getHeight = getHeight;
  state.getWidth = getWidth;
  state.draw = draw;

  return state
}

const UnderlinedCell = (text) => {
  const textCell= TextCell(text);
  const getHeight = () => textCell.getHeight() + 1
  const draw = () => textCell.draw(textCell.getWidth(), textCell.getHeight())
    .concat(repeat("-",textCell.getWidth()))
    //.concat(repeat("-", textCell.getWidth()));
  return {...textCell, getHeight, draw}
}

//console.log("The height of the cell is %s", TextCell("foo\nbar").getHeight())
//console.log(TextCell("foo\nbar").draw())
console.log(TextCell("bla").getWidth())
console.log(UnderlinedCell("test").getHeight())
console.log(UnderlinedCell("test").getWidth())
console.log(UnderlinedCell("test").draw())
