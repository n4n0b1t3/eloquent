I am trying to adopt the new ES6 feature to better compose objects without class inheritance. However, I don't understand how to extend and object or overwrite a function. The code below uses the composition pattern with Object.assign().

**Question**: How can I create a second object factory UnderlinedCell without copying the whole TextCell object which behaves exactly like TextCells with the small difference that getHeight returns getHeight + 1 and the draw method adds a line with dashes "-".

I will walk through the code.
First I add to behaviors like this

<!-- begin snippet: js hide: false console: true babel: false -->

<!-- language: lang-js -->

    const getHeight = (state) => ({
      getHeight: () => state.text.length
    })

    const draw = (state) => ({
      draw: () => state.text.join(" | ")
    })

    const TextCell = (text) => {
      let state = {
        text: text.split("\n")
      }

      return Object.assign(getHeight(state), draw(state))
    }

    console.log("The height of the cell is %s", TextCell("foo\nbar").getHeight())
    console.log(TextCell("foo\nbar").draw())
<!-- end snippet -->
