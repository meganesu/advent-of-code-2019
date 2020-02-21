const readFile = require('../helpers/readFile');
const input = readFile();

const initializeProgram = input => {
  return input.split(',').map(value => parseInt(value));
}

const runProgram = (program, noun, verb) => {
  let programCounter = 0;

  // initial adjustments
  program[1] = noun;
  program[2] = verb;

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

  return program[0];
}

for (let noun = 0; noun < 100; noun += 1) {
  for (let verb = 0; verb < 100; verb += 1) {
    let program = initializeProgram(input);
    const exitCode = runProgram(program, noun, verb);
    if (exitCode === 19690720) {
      console.log('Match found! Noun: ', noun, ', Verb: ', verb);
      console.log(100 * noun + verb);
      return;
    }
  }
}

console.log('Something went wrong. No match found.');