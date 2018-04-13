var isEven = function(number){
  if(number < 0) number *= -1;
  if(number === 0) return "is even";
  else if (number === 1) return "is odd";
  else if (number < 0) return "is negative";
  else if (number > 1) return isEven(number - 2);
}
//adsdadasdhsadkh
console.log(isEven(17900))
console.log(isEven(50))
console.log(isEven(-1))

var BockyDieBockwurst = "?????????"
console.log("Bist du BockyDieBockwurst", BockyDieBockwurst.charAt(4));
var boraDieBockwurst = "Ich bin die coolste Bockwurst der Welt, du fragst dich warum?"


var countBs = function(string){
  let count = 0
  for(var i = 0; i <= string.length -1; i++){
    if(string.charAt(i) == "B") count++;
  }
  return count
}

var countChar = function(string, char){
  let count = 0
  for(var i = 0; i <= string.length -1; i++){
    if(string.charAt(i) == char) count++;
  }
  return count
}
console.log("I've countet %i chars", countChar("Xenophobia is stupid, XOR understandable", "X"))
