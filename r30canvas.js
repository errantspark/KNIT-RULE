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

  let knitPattern = []
  knitPattern.push(pattern)

  for (let i = 1; i < count; i++) {
    knitPattern.push(patGen.next().value)
  }

  flatPattern = knitPattern.reduce((a,b) => a.concat(b), [])
  flatPattern.forEach((v,i) => {
    scratchData.data[i*4] = 255-v * 255
    scratchData.data[i*4+1] = 255-v * 255
    scratchData.data[i*4+2] = 255-v * 255
    scratchData.data[i*4+3] = 255
  })

  scratchContext.putImageData(scratchData, 0, 0)
  container.appendChild(scratchCanvas)
  console.log("LAST LINE")
  console.log("(for easy continuation)")
  console.log(bToP(knitPattern[knitPattern.length-1]))
}

const drawPattern = (pattern, count = 30) => {
  let bPat = pToB(pattern)
  paint(bPat, count)
}

//
console.log("USAGE INSTRUCTIONS:")
console.log(`drawPattern(<pattern as string of "B" and "W">, <number of lines to draw>)`)
console.log("EXAMPLE:")
console.log(`drawPattern("BWBBBWBWBBWBW", 40)`)
