const readFile = require('../helpers/readFile');
const input = readFile();

let programCounter = 0;
let program = input.split(',');

program = program.map(value => parseInt(value));

// initial adjustments
program[1] = 12;
program[2] = 2;

while (true) {
  let currentInstruction = program[programCounter];

  if (currentInstruction === 99) {
    break;
  }
  
  const firstPosition = program[programCounter + 1];
  const secondPosition = program[programCounter + 2];
  const thirdPosition = program[programCounter + 3];

  if (currentInstruction === 1) {
    program[thirdPosition] = program[firstPosition] + program[secondPosition];
  } else if (currentInstruction === 2) {
    program[thirdPosition] = program[firstPosition] * program[secondPosition];
  } else {
    console.log('Something went wrong. Received opcode ', currentInstruction);
    break;
  }

  programCounter += 4;
}

console.log(program[0]);