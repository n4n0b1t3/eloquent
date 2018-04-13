const getHeight = (state) => ({
  getHeight: () => state.text.length
})

const draw = (state) => ({
  draw: () => state.text.join(" | ")
})

const TextCell = (text) => {
  const state = {
    text: text.split("\n")
  }

  return Object.assign(getHeight(state), draw(state))
}


const UnderlineCell = (text) => {
  const textCell = TextCell(text);
  const getHeight = () => textCell.getHeight() + 1;
  const line = '\n------\n';
  const draw = () => textCell.draw().replace(' | ', line) + line;

  return {...textCell, getHeight, draw};
}

const uCell = UnderlineCell('hello\nthis');
console.log(uCell.draw());
