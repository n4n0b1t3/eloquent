/*
Getting colWidths
*/

function colWidths(rows){
  return rows[0].map((_, i) =>
    rows.reduce((accumulator, current) =>
      Math.max(accumulator, current[i].minWidth()), 0))
}

function rowHeights(rows){
  return rows.map((row, index) =>
    row.reduce((accumulator, current) => Math.max(accumulator, current.minHeight()), 0)
  )
}


function minWidth(){ return this.text.reduce((max, current) => Math.max(max, current.length), 0);}
function minHeight(){ return this.text.length }
function draw(width, height){
  let result = [];
  for(let i = 0; i < height; i++){
    var line = this.text[i] || "";
    result.push(line + repeat(" ", width - line.length))
  }
  return result
}

const TextCell = (text) => {
  //console.log("text: %s, type: %s", text, typeof text)
  let state = {
    text: text.split("\n")
  }

  state.minWidth  = minWidth;
  state.minHeight = minHeight;
  state.draw      = draw;

  return state
}

const UnderlinedCell = (text) => {
  const textCell = TextCell(text);
  const minHeight = () => textCell.minHeight() + 1;
  const draw = (width, height) => textCell.draw(width, height -1)
  .concat(repeat("-", width));
  return {...textCell, minHeight, draw}
}


function repeat(char, reps){
  let output = ""
  for(let i = 0; i <= reps; i++){
    output += char
  }
  return output
}

function drawTable(data){
  let widths = colWidths(data);
  let heights = rowHeights(data);

  function drawLine(blocks, lineNo) {
    return blocks.map(block => block[lineNo]).join(" ");
  }

  function drawRow(row, rowNum){
    let blocks = row.map((cell, colNum) =>
      cell.draw(widths[colNum], heights[rowNum]));
    return blocks[0].map((_, lineNo) =>
      drawLine(blocks, lineNo)
    ).join("\n");
  }
  return data.map(drawRow).join("\n");
}

var MOUNTAINS = [
  {name: "Kilimanjaro\ntest", height: 5895, country: "Tanzania"},
  {name: "Everest", height: 8848, country: "Nepal"},
  {name: "Mount Fuji", height: 3776, country: "Japan"},
  {name: "Mont Blanc", height: 4808, country: "Italy/France"},
  {name: "Vaalserberg", height: 323, country: "Netherlands"},
  {name: "Denali", height: 6168, country: "United States"},
  {name: "Popocatepetl", height: 5465, country: "Mexico"}
];

function dataTable(data) {
  let output = []
  let keys = Object.keys(data[0]);
  let headers = keys.map(key => UnderlinedCell(key));
  let body = data.map(row =>
    keys.map(name =>
      TextCell(String(row[name]))));
  return [headers].concat(body);
}


//console.log(dataTable(MOUNTAINS));
//console.log("test colWidths: %s", colWidths(dataTable(MOUNTAINS)));
//console.log("test rowHeights: %s", rowHeights(dataTable(MOUNTAINS)));
console.log(drawTable(dataTable(MOUNTAINS)))
//console.log("=> %s", UnderlinedCell("test").minHeight())
//console.log(UnderlinedCell("test"))
