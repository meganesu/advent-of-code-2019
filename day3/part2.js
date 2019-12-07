const readFile = require('../helpers/readFile');
const input = readFile();

const [firstWire, secondWire] = input.split('\n');

const calcCoordinatesForSection = (startingX, startingY, direction, magnitude) => {
  let currentX = startingX;
  let currentY = startingY;
  let coordinates = [];

  for (let step = 0; step < magnitude; step += 1) {
    if (direction === 'U') {
      currentY += 1;
    } else if (direction === 'R') {
      currentX += 1;
    } else if (direction === 'D') {
      currentY -= 1;
    } else if (direction === 'L') {
      currentX -= 1;
    }
  
    coordinates.push({x: currentX, y: currentY});  
  }
  
  return coordinates;
}

const getWireCoordinates = wireString => {
  let coordinates = [];
  let lastX = 0;
  let lastY = 0;
  const sections = wireString.split(',');

  coordinates.push({x: 0, y: 0});

  for (const section of sections) {
    const direction = section[0];
    const magnitude = parseInt(section.substring(1));
    coordinates = coordinates.concat(calcCoordinatesForSection(lastX, lastY, direction, magnitude));
    lastX = coordinates[coordinates.length - 1].x;
    lastY = coordinates[coordinates.length - 1].y;
  }

  return coordinates;
}

// calculate all the points on the first wire
// calculate all the points on the second wire
const firstWireCoordinates = getWireCoordinates(firstWire);
const secondWireCoordinates = getWireCoordinates(secondWire);

const coordinatesMatch = (firstCoordinate, secondCoordinate) => {
  return firstCoordinate.x === secondCoordinate.x && firstCoordinate.y === secondCoordinate.y;
}

const intersections = [];

for (let secondIndex = 1; secondIndex < secondWireCoordinates.length; secondIndex += 1) {
  for (let firstIndex = 1; firstIndex < firstWireCoordinates.length; firstIndex += 1) {
    const firstCoordinate = firstWireCoordinates[firstIndex];
    const secondCoordinate = secondWireCoordinates[secondIndex];

    if (coordinatesMatch(firstCoordinate, secondCoordinate)) {
      const stepsToFirst = firstIndex;
      const stepsToSecond = secondIndex;
      console.log(stepsToFirst, firstCoordinate);
      console.log(stepsToSecond, secondCoordinate);
      console.log('Combined steps to intersection:', stepsToFirst + stepsToSecond);
      intersections.push({
        coordinate: firstCoordinate,
        combinedSteps: stepsToFirst + stepsToSecond
      });
    }
  }
}

let minCombinedSteps = 999999999999999;
intersections.forEach(intersection => {
  if (intersection.combinedSteps < minCombinedSteps) {
    minCombinedSteps = intersection.combinedSteps;
  }
});

console.log('Minimum combined steps:', minCombinedSteps);