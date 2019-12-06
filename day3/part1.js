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
  
    coordinates = coordinates.concat({x: currentX, y: currentY});  
  }
  
  return coordinates;
}

const getWireCoordinates = wireString => {
  let coordinates = [];
  let lastX = 0;
  let lastY = 0;
  const sections = wireString.split(',');

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

// find all the intersection points
let intersections = [];
for (let firstCoordinate of firstWireCoordinates) {
  for (let secondCoordinate of secondWireCoordinates) {
    if (coordinatesMatch(firstCoordinate, secondCoordinate)) {
      intersections = intersections.concat(firstCoordinate);
    }
  }
}

const calcManhattanDistance = coordinate => {
  return Math.abs(coordinate.x) + Math.abs(coordinate.y);
}

// calculate the manhattan distance for each intersection point
let minManhattanDistance = 999999999999999999999;
for (let intersection of intersections) {
  const distance = calcManhattanDistance(intersection);
  if (distance < minManhattanDistance) {
    minManhattanDistance = distance;
  }
}

// what is the smallest manhattan distance?
console.log('Minimum Manhattan distance:', minManhattanDistance)