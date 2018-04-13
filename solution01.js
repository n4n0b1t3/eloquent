const getHeight = () => ({
  getHeight() {
    return this.text.length
  }
})

const draw = () => ({
  draw() {
    return this.text.join(" | ")
  }
})

const TextCell = (text) => {
  let state = {
    text: text.split("\n")
  }

  return Object.assign(state, getHeight(), draw())
}

const TextCell2 = (text) => {
  let state = TextCell(text)

  var originalGetHeight = state.getHeight;

  return Object.assign(state, {
    getHeight() {
      // use the original original getHeight and append + 1
      return originalGetHeight.call(this) + 1
    },
    draw() {
      return this.text.join(" - ")
    }
  });
}

console.log("The height of the cell is %s", TextCell("foo\nbar").getHeight())
console.log(TextCell("foo\nbar").draw())

console.log("The height of the cell is %s", TextCell2("foo\nbar").getHeight())
console.log(TextCell2("foo\nbar").draw())
