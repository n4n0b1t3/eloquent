/* abilities
format is const methodName = (state) => ({})
it returns an object
*/



function repeat(char, repetitions){
  let output = "";
  for(let i = 0; i <= repetitions; i++){
    output += char;
  }
  return output;
}


const getHeight = (state) => ({
    getHeight: () => state.text.length
})

const draw = (state) => ({
  draw: (width, height) => state.text + repeat(".", width - state.text.length)
})


/* objects */

const TextCell = (text) => {
  let state = {
    text,
    magicNumber: 42
  }

  return Object.assign(
    {},
    getHeight(state),
    draw(state),
    state
  )
}

console.log(TextCell("test").draw(15, 1))
console.log(TextCell("test").text )
