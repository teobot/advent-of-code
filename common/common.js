const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const returnInput = (filename) => {
  return fs.readFileSync(path.resolve(__dirname, filename), "utf-8");
};

const inputToArray = (filename, splitter) => {
  return returnInput(filename).split(splitter);
};

const inputToIntArray = (filename, split) => {
  return returnInput(filename).split(split).map(Number);
};

function calculatePercentage(part, total) {
  return Math.round((part / total) * 100);
}

const tests = (tests) => {
  console.clear();
  let passedTests = 0;
  for (let i = 0; i < tests.length; i++) {
    const { f, input, expected } = tests[i];
    let toRun = tests[i].enabled !== undefined ? tests[i].enabled : true;
    if (toRun) {
      let result = f(input);
      let passedOrFail = result === expected;
      console.log(chalk`
      \tTest {underline #${i + 1}} {${
        passedOrFail ? "green.bold passed" : "red.bold failed"
      }}.
      \tExpected {green.bold ${expected}} ${
        passedOrFail ? "and" : "but"
      } got {${passedOrFail ? "green" : "red"}.bold ${result}}
    `);
      if (passedOrFail) passedTests++;
    }
  }
  console.log(chalk`
    \tPassed {green.bold ${passedTests}} out of {red.bold ${
    tests.length
  }} - ${calculatePercentage(passedTests, tests.length)}%.
  `);
};

const inputToString = (filename) => {
  return returnInput(filename);
};

function isOdd(num) {
  return num % 2;
}

const findManhattanDistance = (p1, p2) => {
  return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
};

const generateGrid = (maxX, maxY, fill) => {
  // generate a array of arrays using the max X and Y
  let grid = [];
  for (let y = 0; y <= maxY; y++) {
    grid[y] = [];
    for (let x = 0; x <= maxX; x++) {
      grid[y][x] = fill;
    }
  }
  return grid;
};

const returnAllPointsBetweenTwoCoords = (coord1, coord2) => {
  // return all the coordinates between two coordinates
  let points = [];
  let x1 = coord1.x;
  let y1 = coord1.y;
  let x2 = coord2.x;
  let y2 = coord2.y;
  let XPoints = [];
  let YPoints = [];
  if (x1 < x2) {
    // x1 is less than x2
    for (let x = x1; x <= x2; x++) {
      XPoints.push(x);
    }
  } else {
    // x1 is greater than x2
    for (let x = x1; x >= x2; x--) {
      XPoints.push(x);
    }
  }
  if (y1 < y2) {
    // y1 is less than y2
    for (let y = y1; y <= y2; y++) {
      YPoints.push(y);
    }
  } else {
    // y1 is greater than y2
    for (let y = y1; y >= y2; y--) {
      YPoints.push(y);
    }
  }
  XPoints.forEach((xcoord, i) => {
    points.push({ x: xcoord, y: YPoints[i] });
  });
  return points;
};

const findMaxCoordsInArray = (input) => {
  // find the max X and Y on a array of coords
  let maxX = 0,
    maxY = 0;
  input.forEach(({ x, y }) => {
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  });
  return { maxX, maxY };
};

const test = (f, i, e) => {
  return { f: f, input: i, expected: e }
}

module.exports = {
  inputToArray,
  inputToIntArray,
  tests,
  inputToString,
  isOdd,
  findManhattanDistance,
  returnInput,
  generateGrid,
  returnAllPointsBetweenTwoCoords,
  findMaxCoordsInArray,
  test
};
