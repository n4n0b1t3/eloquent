/*
Version 2
This version contains
 - the TextCell Object
 - repeat function
 - in drawTable: drawLine
*/


function TextCell(text){
  // line breaks result in an array instead of a string
  // split always returns an array
  // console.log(Array.isArray("test".split("")));
  // console.log(typeof text)
  // console.log(text)
  this.text = text.split("\n");
}

TextCell.prototype.minWidth = function(){
  return this.text.reduce((width, line) => Math.max(width, line.length), 0);
}

TextCell.prototype.minHeight = function(){
  return this.text.length;
}

TextCell.prototype.draw = function(width, height){
  let result = [];
  for(let i = 0; i <= height-1; i++){
    let line = String(this.text[i]);
    result.push(line + repeat(" ", width - line.length))
  }
  return result;
}


function repeat(char, repetitions){
  let output = "";
  for(let i = 0; i <= repetitions; i++){
    output += char;
  }
  return output;
}

function drawTable(rows){
//  let heights = rowHeights(rows);
//  let widths = rowWidths(rows);

  let output = "";

  function  drawLine(row){
    let lines = row.map(attribute => attribute.draw(15,1))
    return lines.join(" ")
  }
  output = rows.map(row => drawLine(row));
  let halfway = output.join("\n")
  return halfway

}

function dataTable(data){
  let keys = Object.keys(data[0]);
  let headers = keys.map(key => new TextCell(String(key)))
  let body = data.map(object => keys.map(key => new TextCell(String(object[key]))))
  return [headers].concat(body);
}


var MOUNTAINS = [
  {name: "Kilimanjaro", height: 5895, country: "Tanzania"},
  {name: "Everest", height: 8848, country: "Nepal"},
  {name: "Mount Fuji", height: 3776, country: "Japan"},
  {name: "Mont Blanc", height: 4808, country: "Italy/France"},
  {name: "Vaalserberg", height: 323, country: "Netherlands"},
  {name: "Denali", height: 6168, country: "United States"},
  {name: "Popocatepetl", height: 5465, country: "Mexico"}
];

console.log(drawTable(dataTable(MOUNTAINS)));
