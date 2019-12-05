const readFile = require('../helpers/readFile');
const input = readFile();

let sum = 0;

const calculateFuelFor = input => {
  console.log("calculate fuel for ", input)

  const fuel = Math.floor(input / 3) - 2;
  console.log('fuel required: ', fuel)

  if (fuel < 0) {
    console.log("can't have negative fuel ", fuel, ", returning 0 instead")
    return 0;
  }

  return fuel + calculateFuelFor(fuel);
}

const lines = input.split('\n');
for (let line of lines) {
  const mass = parseInt(line);
  sum += calculateFuelFor(mass);
}

console.log(sum)