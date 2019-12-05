const readFile = require('../helpers/readFile');
const input = readFile();

let sum = 0;

const lines = input.split('\n');
for (let line of lines) {
  const mass = parseInt(line);
  sum += (Math.floor(mass / 3) - 2);
}

console.log(sum)