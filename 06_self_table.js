function drawTable(rows){
  let output = "";

  function  drawLine(row){
    return row.join(" ")
  }

  output = rows.map(row => drawLine(row));
  return output.join("\n")

}

function dataTable(data){
  let keys = Object.keys(data[0]);
  let body = data.map(object => keys.map(key => object[key]))
  return [keys].concat(body);
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
