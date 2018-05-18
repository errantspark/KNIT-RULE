let container = document.getElementById('pattern')

let clearContainer = () => {
  var myNode = document.getElementById("pattern");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
}

let paint = (pattern, count = 10) => {
  clearContainer()
  let scratchCanvas = document.createElement("canvas")
  let width = scratchCanvas.width = pattern.length
  let height = scratchCanvas.height = count
  let scratchContext = scratchCanvas.getContext("2d")
  let scratchData = scratchContext.getImageData(0,0,scratchCanvas.width,scratchCanvas.height)

  let patGen = gen(pattern)

  let flatPattern = []
  flatPattern.push(pattern)

  for (let i = 1; i < count; i++) {
    flatPattern.push(patGen.next().value)
  }

  flatPattern = flatPattern.reduce((a,b) => a.concat(b), [])
  flatPattern.forEach((v,i) => {
    scratchData.data[i*4] = 255-v * 255
    scratchData.data[i*4+1] = 255-v * 255
    scratchData.data[i*4+2] = 255-v * 255
    scratchData.data[i*4+3] = 255
  })

  console.log(flatPattern)
  console.log(scratchData)

  scratchContext.putImageData(scratchData, 0, 0)
  container.appendChild(scratchCanvas)
}

const drawPattern = (pattern, count = 30) => {
  let bPat = pToB(pattern)
  paint(bPat, count)
}
