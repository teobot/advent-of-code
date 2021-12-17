// Advent of code 2021 -- Filename : main.js
// Task link -- https://adventofcode.com/2021/day/15
// Github link -- https://github.com/teobot/advent-of-code/tree/main/2021/task%2015
// Created by Theo Clapperton

const {
  findManhattanDistance,
  inputToArray,
  tests,
  generateGrid,
} = require("../../common/common");

const _REALinput = inputToArray("../2021/task 15/input.txt", "\n");
const _TESTinput = [
  "1163751742",
  "1381373672",
  "2136511328",
  "3694931569",
  "7463417111",
  "1319128137",
  "1359912421",
  "3125421639",
  "1293138521",
  "2311944581",
];

const part1 = (i) => {
  // part 1

  let actualValueArray = i.map((line, lineIndex) => line.split("").map(Number));
  let input = i.map((line, lineIndex) => line.split("").map(Number));
  let travelledArray = generateGrid(input[0].length - 1, input.length - 1, 0);

  let running = true;
  let xIndex = 0;
  let yIndex = 0;
  let sum = 0;

  while (running) {
    // find the lowest value around the current index

    let belowValue = input[yIndex + 1][xIndex] || 10;
    let rightValue = input[yIndex][xIndex + 1] || 10;

    if (belowValue <= rightValue) {
      yIndex++;
    } else {
      xIndex++;
    }

    sum += actualValueArray[yIndex][xIndex];
    travelledArray[yIndex][xIndex]++;
    actualValueArray[yIndex][xIndex] = "X";

    // if the current value is 0, we're done
    if (yIndex >= input.length - 1) {
      running = false;
    }
  }

  console.log("====================================");
  console.table(actualValueArray);
  console.table(input);
  console.table(travelledArray);
  console.log({ sum });
  console.log("====================================");

  return 0;
};

const part2 = (input) => {
  // part 2

  return 0;
};

tests([
  { f: part1, input: _TESTinput, expected: 0 },
  //{ f: part1, input: _REALinput, expected: 0 },
  //{ f: part2, input: _TESTinput, expected: 0 },
  //{ f: part2, input: _REALinput, expected: 0 },
]);
