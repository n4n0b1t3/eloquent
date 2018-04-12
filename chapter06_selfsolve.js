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
    row.reduce((accumulator, current) =>
      Math.max(accumulator, current.minHeight())
    , 0)
  )
}

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

function UnderlinedCell(innerCell){
  this.inner = innerCell;
}

UnderlinedCell.prototype.minWidth = function(){
  return this.inner.minWidth();
}

UnderlinedCell.prototype.minHeight = function(){
  return this.inner.minHeight() + 1
}

UnderlinedCell.prototype.draw = function(width, height){
  // carefull to remove one height here, since concat will add one line anyway
  //console.log(Array.isArray(this.inner.draw(width, height)));
  return this.inner.draw(width, height -1)
  .concat(repeat("-", width));
}

function repeat(char, reps){
  let output = ""
  for(let i = 0; i <= reps; i++){
    output += char
  }
  return output
}


let myTest = new TextCell("tes\ntest");
/*
console.log(myTest.minWidth())
console.log(myTest.minHeight())
console.log(myTest.draw())
*/

function drawTable(data){
  let widths = colWidths(data);
  let heights = rowHeights(data);
  //console.log("in dT: %s %s", heights, widths)

  // a row can consist of more than one line, therefore the distinction between line and row
  function drawLine(blocks, lineNo) {
    return blocks.map(block => block[lineNo]).join(" ");
  }

  function drawRow(row, rowNum){
    let blocks = row.map((cell, colNum) =>
      cell.draw(widths[colNum], heights[rowNum])
    )
    // use blocks[0].map to walk through the lines of the array cell.draw returns, basically the lines
    // this one walks through the aray vertically
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
  let headers = keys.map(key => new UnderlinedCell(new TextCell(key)));
  let body = data.map(row =>
    keys.map(name =>
      new TextCell(String(row[name]))));
  return [headers].concat(body);
}
//console.log(dataTable(MOUNTAINS));
//console.log("test colWidths: %s", colWidths(dataTable(MOUNTAINS)));
//console.log("test rowHeights: %s", rowHeights(dataTable(MOUNTAINS)));
console.log(drawTable(dataTable(MOUNTAINS)))
