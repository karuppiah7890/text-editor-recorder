const fs = require('fs')

const fileContent = fs.readFileSync(process.argv[2], 'utf8')

const deltas = JSON.parse(fileContent)

// console.log(deltas);

console.log("The deltas whose timeFromStart decreases compared to previous delta");
let maxDiffForDecreasingDeltas = 0;
let deltaWithMaxDiffForDecreasingDeltas = {}

let maxDiffForIncreasingDeltas = 0;
let deltaWithMaxDiffForIncreasingDeltas = {}

deltas.forEach((delta, index) => {
    if (index == 0) {
        return
    }

    const previousDelta = deltas[index - 1]

    if (delta.timeFromStart < previousDelta.timeFromStart) {
        console.log(delta, previousDelta.timeFromStart - delta.timeFromStart);

        const diff = previousDelta.timeFromStart - delta.timeFromStart
        if (diff > maxDiffForDecreasingDeltas) {
            deltaWithMaxDiffForDecreasingDeltas = delta
            maxDiffForDecreasingDeltas = diff
        }
    } else {
        const diff = delta.timeFromStart - previousDelta.timeFromStart
        if (diff > maxDiffForIncreasingDeltas) {
            deltaWithMaxDiffForIncreasingDeltas = delta
            maxDiffForIncreasingDeltas = diff
        }
    }
});

console.log("\nFor decreasing order of deltas -");
console.log("The largest diff between timeFromStart of two deltas is - ", maxDiffForDecreasingDeltas);
console.log("The delta which occurs after the largest diff is - ", deltaWithMaxDiffForDecreasingDeltas);

console.log("\nFor increasing order of deltas -");
console.log("The largest diff between timeFromStart of two deltas is - ", maxDiffForIncreasingDeltas);
console.log("The delta which occurs after the largest diff is - ", deltaWithMaxDiffForIncreasingDeltas);

