const fs = require('fs')

const fileContent = fs.readFileSync(process.argv[2], 'utf8')

const deltas = JSON.parse(fileContent)

// console.log(deltas);

console.log("The deltas whose timeFromStart decreases compared to previous delta");
deltas.forEach((delta, index) => {
    if (index == 0) {
        return
    }

    const previousDelta = deltas[index - 1]

    if (delta.timeFromStart < previousDelta.timeFromStart) {
        console.log(delta, previousDelta.timeFromStart - delta.timeFromStart);
    }
});

let deltaWithMaxDiff = {}
let largestDiff = deltas.reduce((maxDiff, delta, index,) => {
    if (index == 0) {
        return maxDiff
    }

    const previousDelta = deltas[index - 1]

    if (delta.timeFromStart < previousDelta.timeFromStart) {
        diff = previousDelta.timeFromStart - delta.timeFromStart
        if (diff > maxDiff) {
            deltaWithMaxDiff = delta
            maxDiff = diff
        }
    }
    return maxDiff
}, 0);
console.log("The largest diff between timeFromStart of two deltas is - ", largestDiff);
console.log("The delta which occurs after the largest diff is - ", deltaWithMaxDiff);
