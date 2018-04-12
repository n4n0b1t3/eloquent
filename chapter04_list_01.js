let arrayToList = function(arr){
  let arrLen = arr.length;
  let list = {value:arr[arrLen-1], rest: null}
  for(var i = arrLen-2; i >=0 ; i--){
    list = {value: arr[i], rest: list}
  }
  return list;
}

let listToArray = function(list){
  let output = []
  do{
    output.push(list.value)
    list = list.rest;
  }while(list.rest != null);
  output.push(list.value)
  return output
}

let listPrepend = function(list, value){
  list = {value: value, rest: list}
  return list
}

let nth = function(list,position){
    let arr = listToArray(list);
    return arr[position];
}

let myArr = [1,2,3,4,5,6,7]
let myList = arrayToList(myArr)
myList = listPrepend(myList, 0);
myList = listPrepend(myList, -1);
console.log(JSON.stringify(myList))
console.log(listToArray(myList))
console.log(nth(myList, 6));
