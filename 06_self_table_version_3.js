/*
Version 3
This version contains additionally to version 2
*/

function rowHeights (datatable){
  return datatable.map(row =>
      row.reduce((accumulator, cell) =>
        Math.max(accumulator, cell.getHeight()), 0)
  )
}


function colWidths (datatable){
  return datatable[0].map((_, colNum) =>
    datatable.reduce((accumulator, current) =>
      Math.max(accumulator, current[colNum].getWidth())
    , 0)
  )
}

const getHeight = (state) => ({
  // use add to return additional
  getHeight: (add = 0) => state.text.length
})

const getWidth = (state) => ({
  getWidth: () => state.text.reduce((accumulator, current) => current.length, 0)
})

const draw = (state) => ({
  draw: (width, height) => {
    let result = [];
    for(let i = 0; i < height; i++){
      let line = state.text[i] || "";
      result.push(line + repeat(" ", width - line.length))
    }
    return result
  }
})

/* objects */

const TextCell = (text) => {
  let state = {
    text: text.split("\n")
  }

  return Object.assign(
    {},
    getHeight(state),
    getWidth(state),
    draw(state),
    state
  )
}

console.log(TextCell("foo").getWidth())

const UnderlinedCell = (text) => {
  let state = {
    text: text.split("\n")
  }

  return Object.assign(
    {},
    getHeight(state),
    getWidth(state),
    draw(state),
    state
  )
}


console.log(TextCell("tata\nTata\nTata").getHeight())

function drawTable(datatable){
  let widths = colWidths(datatable);
  let heights = rowHeights(datatable);

  function drawLine(blocks, lineNo){
    return blocks.map(block => block[lineNo]).join(" ");
  }

  function drawRow(row, rowNum){
    let blocks = row.map((cell, colNum) =>
      cell.draw(widths[colNum], heights[rowNum]));
    return blocks[0].map((_,lineNo) =>
      drawLine(blocks, lineNo)
    ).join("\n")
  }

  return datatable.map(drawRow).join("\n");
}

function repeat(char, repetitions){
  let output = "";
  for(let i = 0; i <= repetitions; i++){
    output += char;
  }
  return output;
}


function dataTable(data){
  let keys = Object.keys(data[0]);
  let headers  = keys.map(key => UnderlinedCell(String(key)))
  let body = data.map(object => keys.map(key => TextCell(String(object[key]))))
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
// console.log(rowHeights(dataTable(MOUNTAINS)));
//console.log(colWidths(dataTable(MOUNTAINS)));
console.log(drawTable(dataTable(MOUNTAINS)));
//console.log(dataTable(MOUNTAINS));
