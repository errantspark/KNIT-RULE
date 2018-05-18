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

//example
scarf = generator("WBBBWWBWWBWBBBWB")
nextN(scarf, 10)
