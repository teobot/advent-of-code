// Advent of code 2021 -- Filename : main.js
// Task link -- https://adventofcode.com/2021/day/13
// Github link -- https://github.com/teobot/advent-of-code/tree/main/2021/task%2013
// Created by Theo Clapperton

const {
  generateGrid,
  returnInput,
  findMaxCoordsInArray,
  tests,
} = require("../../common/common");

const _REALinput = returnInput("../2021/task 13/input.txt");
const _TESTinput = returnInput("../2021/task 13/test.txt");

const getCoords = (input) => {
  return input.split("\n").map((line) => {
    const [x, y] = line.split(",");
    return { x: Number(x), y: Number(y) };
  });
};

const getFolds = (input) => {
  return input.split("\n").map((line) => {
    const [a, b, c] = line.split(" ");
    return { isX: c.split("=")[0] === "x", val: Number(c.split("=")[1]) };
  });
};

const part1 = (input) => {
  // part 1
  let [cRaw, fRaw] = input.split("\n\n");

  let coords = getCoords(cRaw);
  let folds = getFolds(fRaw);

  folds = folds.splice(0, 1);

  folds.forEach((fold) => {
    for (let i = 0; i < coords.length; i++) {
      if (fold.isX) {
        // fold it hoz left
        if (coords[i].x > fold.val) {
          coords[i].x = fold.val - Math.abs(coords[i].x - fold.val);
        }
      } else {
        // its vertical fold it up
        if (coords[i].y > fold.val) {
          coords[i].y = fold.val - Math.abs(coords[i].y - fold.val);
        }
      }
    }
  });

  let result = [];
  coords.forEach(function (item) {
    if (result.indexOf(`${item.x},${item.y}`) < 0) {
      result.push(`${item.x},${item.y}`);
    }
  });

  return result.length;
};

const part2 = (input) => {
  // part 2
  let [cRaw, fRaw] = input.split("\n\n");

  let coords = getCoords(cRaw);
  let folds = getFolds(fRaw);

  folds.forEach((fold) => {
    for (let i = 0; i < coords.length; i++) {
      if (fold.isX) {
        // fold it hoz left
        if (coords[i].x > fold.val) {
          coords[i].x = fold.val - Math.abs(coords[i].x - fold.val);
        }
      } else {
        // its vertical fold it up
        if (coords[i].y > fold.val) {
          coords[i].y = fold.val - Math.abs(coords[i].y - fold.val);
        }
      }
    }
  });

  let result = [];
  coords.forEach(function (item) {
    if (result.indexOf(`${item.x},${item.y}`) < 0) {
      result.push(`${item.x},${item.y}`);
    }
  });


  let newCoords = result.map((coord) => {
    let [x, y] = coord.split(",").map(Number);
    return { x, y };
  });

  console.log(newCoords);
  let {maxX, maxY} = findMaxCoordsInArray(newCoords);
  let grid = generateGrid(maxX, maxY, "|");
  newCoords.forEach(({x, y}) => {
      grid[y][x] = "@";
  });

  console.table(grid)

  return result.length;
};

tests([
  { f: part1, input: _TESTinput, expected: 17 },
  { f: part1, input: _REALinput, expected: 0 },
  { f: part2, input: _REALinput, expected: 0 },
]);
