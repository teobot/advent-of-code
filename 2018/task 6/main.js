// Advent of code 2018 -- Filename : main.js
// Task link -- https://adventofcode.com/2018/day/6
// Github link -- https://github.com/teobot/advent-of-code/tree/main/2018/task%206
// Created by Theo Clapperton

const { inputToArray, findManhattanDistance } = require("../../common/common");

const _REALinput = inputToArray("../2018/task 6/input.txt", "\n");

const getCoords = (string) => {
  // get the coords from the string
  const [x, y] = string.split(",").map((n) => parseInt(n, 10));
  return { x, y };
};

const generateGrid = (maxX, maxY) => {
  // generate a array of arrays using the max X and Y
  const grid = [];
  for (let y = 0; y <= maxY; y++) {
    grid[y] = [];
    for (let x = 0; x <= maxX; x++) {
      grid[y][x] = ".";
    }
  }
  return grid;
};

const findMaxCoordsInArray = (arr) => {
  // find the max X and Y on a array of coords
  let maxX = 0,
    maxY = 0;
  input.forEach((coords) => {
    let { x, y } = getCoords(coords);
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  });
  return { maxX, maxY };
};

const part1 = (input) => {
  // part 1

  // find max X and Y
  let { maxX, maxY } = findMaxCoordsInArray(input);

  // make the grid for the input
  let grid = generateGrid(maxX, maxY);

  // add the coords to the grid
  input.forEach((coords) => {
    let { x, y } = getCoords(coords);
    grid[y][x] = `${x}${y}`;
  });

  // find the closest coords to each point
  for (let _y = 0; _y < grid.length; _y++) {
    let row = grid[_y];
    for (let _x = 0; _x < row.length; _x++) {
      let closest = "";
      let closestDistance = Infinity;
      input.forEach((coords) => {
        let { x, y } = getCoords(coords);
        let distance = findManhattanDistance({ x, y }, { x: _x, y: _y });
        if (distance < closestDistance) {
          closestDistance = distance;
          closest = `${x}${y}`;
        }
      });
      grid[_y][_x] = closest;
    }
  }

  // count the number of coords in each area
  let pointFrequencyArray = {};
  let arrayOfInfiniteValues = [];
  for (let _y = 0; _y < grid.length; _y++) {
    let row = grid[_y];
    for (let _x = 0; _x < row.length; _x++) {
      let point = row[_x];
      if (arrayOfInfiniteValues.includes(point)) {
        // delete the value from the frequency array to avoid cleaning up later
        delete pointFrequencyArray[point];
        continue;
      }
      // dont count the edge points or those that are the same distance between values
      if (
        point === "." ||
        _x === 0 ||
        _x === row.length - 1 ||
        _y === 0 ||
        _y === grid.length - 1
      ) {
        arrayOfInfiniteValues.push(point);
        continue;
      }

      if (!pointFrequencyArray[point]) pointFrequencyArray[point] = 0;
      pointFrequencyArray[point]++;
    }
  }

  // find the largest area
  let largest = 0;
  for (let point in pointFrequencyArray) {
    if (pointFrequencyArray[point] > largest)
      largest = pointFrequencyArray[point];
  }

  return largest;
};

const part2 = (input) => {
  // part 2

  // find max X and Y
  let { maxX, maxY } = findMaxCoordsInArray(input);

  // make the grid for the input
  let grid = generateGrid(maxX, maxY);

  // add the coords to the grid
  input.forEach((coords) => {
    let { x, y } = getCoords(coords);
    grid[y][x] = `${x}${y}`;
  });

  // find the closest coords to each point
  for (let _y = 0; _y < grid.length; _y++) {
    let row = grid[_y];
    for (let _x = 0; _x < row.length; _x++) {
      let sumOfDistances = 0;
      input.forEach((coords) => {
        let { x, y } = getCoords(coords);
        sumOfDistances += findManhattanDistance({ x, y }, { x: _x, y: _y });
      });
      if (sumOfDistances < 10000) grid[_y][_x] = "#";
    }
  }

  // count the number of hashes in the grid
  let numberOfHashes = 0;
  for (let _y = 0; _y < grid.length; _y++) {
    let row = grid[_y];
    for (let _x = 0; _x < row.length; _x++) {
      if (grid[_y][_x] === "#") numberOfHashes++;
    }
  }

  return numberOfHashes;
};

console.log({ task: 1, value: part1(_REALinput) });
console.log({ task: 2, value: part2(_REALinput) });
