const rule30 = [0,1,1,1,1,0,0,0]
const next = (prev, rule) => prev.map((v,i) => {
	let l = prev.length
	let above = parseInt([prev[(l+i-1)%l],prev[i],prev[(l+i+1)%l]].join(""),2)
	return rule[above]
})
const pToB = string => string.split("").map(x => x.match(/b/i) ? 1 : 0)
const bToP = array => array.map(x => x?"B":"W").join("")

const gen = function*(initial) {
  while(true) {
    initial = next(initial, rule30)
    yield initial 
  }
}

const generator = pattern => gen(pToB(pattern))

const nextN = (gen, n) => {
  for(let i = 0; i < n; i++){
    console.log(bToP(gen.next().value))
  }
}

///////

let container = document.getElementById('pattern')

let clearContainer = () => {
  var myNode = document.getElementById("pattern");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
}

let paint = (pattern, count = 10, init = 0) => {
  clearContainer()
  let scratchCanvas = document.createElement("canvas")
  let width = scratchCanvas.width = pattern.length
  let height = scratchCanvas.height = count
  let scratchContext = scratchCanvas.getContext("2d")
  let scratchData = scratchContext.getImageData(0,0,scratchCanvas.width,scratchCanvas.height)

  let patGen = gen(pattern)

  let knitPattern = []
  if (init === 0) {
    knitPattern.push(pattern)

    for (let i = 1; i < count; i++) {
      knitPattern.push(patGen.next().value)
    }

  } else {
    for (let i = 0; i < init; i++) {
      patGen.next().value
    }
    for (let i = 1; i < count; i++) {
      knitPattern.push(patGen.next().value)
    }

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

const drawPattern = (pattern, count = 30, init = 0) => {
  let bPat = pToB(pattern)
  paint(bPat, count, init)
}

const controls = document.getElementById("controls")
const initPatternInput = document.getElementById("pattern-input")
const linesInput = document.getElementById("lines-input")
const startLineInput = document.getElementById("start-input")

controls.oninput = evt => {
  drawPattern(initPatternInput.value, linesInput.value, startLineInput.value)
}
controls.oninput()

//
console.log("USAGE INSTRUCTIONS:")
console.log(`drawPattern(<pattern as string of "B" and "W">, <number of lines to draw>)`)
console.log("EXAMPLE:")
console.log(`drawPattern("BWBBBWBWBBWBW", 40)`)
