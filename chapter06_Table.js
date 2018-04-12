function rowHeights(rows) {
  return rows.map(row => row.reduce((max, cell) => Math.max(max, cell.minHeight()), 0)
  );
}

function colWidths(rows) {
  return rows[0].map(
    (_, i) => rows.reduce(
      (max, row) => Math.max(max, row[i].minWidth()), 0)
  );
}

function drawTable(rows) {
  let heights = rowHeights(rows);
  let widths = colWidths(rows);

  function drawLine(blocks, lineNo) {
    //console.log("in drawLine: %s", blocks);
    return blocks.map(block => block[lineNo]).join(" ");
  }

  function drawRow(row, rowNum) {
    //console.log("in drawRows: %s", row)
    let blocks = row.map((cell, colNum) => cell.draw(widths[colNum], heights[rowNum]));
    return blocks[0].map((_, lineNo) => drawLine(blocks, lineNo)).join("\n");
  }
  return rows.map(drawRow).join("\n");
}


function repeat(string, times) {
  let result = "";
  for (var i = 0; i < times; i++)
    result += string;
  return result;
}


//start Object declaration
function TextCell(text) {
  this.text = text.split("\n");
}

TextCell.prototype.minWidth = function() {
  return this.text.reduce((width, line) => Math.max(width, line.length), 0);
}

TextCell.prototype.minHeight = function() {
   return this.text.length;
}

TextCell.prototype.draw = function(width, height) {
  let result = [];
  for (var i = 0; i < height; i++) {
    let line = this.text[i] || "";
    result.push(line + repeat(" ", width - line.length));
  }
  console.log("in TC.pt.draw(): %s", result)
  return result;
}

var rows = [];

for (var i = 0; i < 5; i++) {
  var row = [];
  for (var j = 0; j < 5; j++) {
    if((j + i) % 2 == 0)
      row.push(new TextCell("##"));
    else
      row.push(new TextCell("  "));
  }
  rows.push(row);
}

function UnderlinedCell(inner) {
  this.inner = inner;
}

UnderlinedCell.prototype.minWidth = function() {
  return this.inner.minWidth();
}

UnderlinedCell.prototype.minHeight = function() {
  return this.inner.minHeight() + 1;
}

UnderlinedCell.prototype.draw = function(width, height) {
  return this.inner.draw(width, height -1)
  .concat([repeat("-", width)]);
}

function dataTable(data) {
  let keys = Object.keys(data[0]);
  let headers = keys.map(name => new UnderlinedCell(new TextCell(name)));
  let body = data.map(row => keys.map(name => new TextCell(yrow[name]))));
  return [headers].concat(body);
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

//console.log(dataTable(MOUNTAINS));
console.log(drawTable(dataTable(MOUNTAINS)));
