let MaleOne = {
  name:"Father One",
  born:1700,
  father:"Adam"
}
let MaleOneBadCopy = {
  name:"Father One",
  born:1700,
  father:"Adam"
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
  returnValue = true
  if(firstElement == null || secondElement == null){
    if(firstElement == secondElement){
      console.log("both elements are null")
      return true
    }else{
      console.log("one element is null")
      return false
    }
  }

  if(typeof firstElement != typeof secondElement){
    console.log("not the same type")
    return false
  }

  //handle primitive types
  if(typeof firstElement != "object"){
    console.log("primitive type")
    return firstElement != secondElement ? false : true
  }

  // what other types are there, here I believe its only primitive or object
  if(typeof firstElement == "object"){
    // compare attributes
    if(Object.keys(firstElement).length != Object.keys(secondElement).length){
        console.log("objects with different number of keys")
        return false
    }
    for(key in firstElement){
      if(key in secondElement){
        // testing for objects
        if(typeof firstElement[key] == typeof secondElement[key]){
          // recursive for objects
          if(typeof firstElement[key] == "object"){
            depth += 1;
            console.log("recursion, depth: %s", depth)
            // using return value to be able end after recursion returns false
            if(!deepCompare(firstElement[key], secondElement[key],depth)) {
              return false
            }
          }else if(firstElement[key] != secondElement[key]) {
            console.log(`property "${key}" not equal: ${JSON.stringify(firstElement[key])} != ${JSON.stringify(secondElement[key])}`)
            return false
          }
        }else{
          // end: key in secondElement
          console.log("object key of different type")
          return false
        }
      }else{
        console.log("key missing in one element")
        return false
      }
    }
    if(returnValue == false){
      return false
    }
    return true;
  }
}

console.log(JSON.stringify(deepCompare(p1,p2)));
