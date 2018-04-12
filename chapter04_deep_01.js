let MaleOne = {
  name:"Father One",
  born:1700,
  father:"Adam"
}
let MaleOneBadCopy = {
  name:"Father One",
  born:1700,
  father:"Adams"
}

let MaleTwo = {
  name:"Father Two",
  born:1800,
  father:MaleOne
}

let MaleTwoBadCopy = {
  name:"Father Two",
  born:1800,
  father:MaleOneBadCopy
}

let p1 = {
  name:"P 1",
  born:1900,
  father:MaleTwo
}

let p2 = {
  name:"P 1",
  born:1900,
  father:MaleTwoBadCopy
}


let deepCompare = function(firstElement, secondElement, depth=0){
  let returnValue = false
  let returnMessage = []
  if(firstElement == null || secondElement == null){
    if(firstElement == secondElement){
      returnMessage.push("both elements are null")
      returnValue = true
    }else{
      returnMessage.push("one element is null")
      returnValue = false
    }
  }

  if(typeof firstElement != typeof secondElement){
    returnMessage.push("not the same type")
    returnValue = false
  }

  //handle primitive types
  if(typeof firstElement != "object"){
    returnMessage.push("primitive type")
    returnValue = firstElement != secondElement ? false : true
  }

  // what other types are there, here I believe its only primitive or object
  if(typeof firstElement == "object"){
    // compare attributes
    if(Object.keys(firstElement).length != Object.keys(secondElement).length){
        returnMessage.push("objects with different number of keys")
        returnValue = false
    }
    for(key in firstElement){
      if(key in secondElement){
        //console.log("if %s and %s", firstElement[key], secondElement[key])
        // testing for objects
        if(typeof firstElement[key] == typeof secondElement[key]){
          // recursive for objects
          if(typeof firstElement[key] == "object"){
            console.log("%s is an object", JSON.stringify(firstElement[key]))
            depth += 1;
            deepCompare(firstElement[key], secondElement[key],depth)
          }else if(firstElement[key] == secondElement[key]){
            returnValue = true
          }else{
            console.log(typeof firstElement[key])
            returnMessage.push(`${JSON.stringify(firstElement[key])} not equal to ${JSON.stringify(secondElement[key])}`)
            returnValue = false
          }
        }else{
          // end: key in secondElement
          returnMessage.push("object key of different type")
          returnValue = false
        }
      }else{
        returnMessage.push("key missing in one element")
        returnValue = false
      }
    }
  }
  return {value: returnValue, message: returnMessage, depth:depth}
}

console.log(JSON.stringify(deepCompare(p1,p2)));
//console.log(JSON.stringify(p1))
//console.log(p1)
console.log(p2)
