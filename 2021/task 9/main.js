// Advent of code 2021 -- Filename : main.js
// Task link -- https://adventofcode.com/2021/day/9
// Github link -- https://github.com/teobot/advent-of-code/tree/main/2021/task%209
// Created by Theo Clapperton

const { inputToArray, tests } = require("../../common/common");

const _REALinput = inputToArray("../2021/task 9/input.txt", "\n");
const _TESTinput = inputToArray("../2021/task 9/test.txt", "\n");

const part1 = (input) => {
  // part 1
  let sum = 0;
  let heightMap = input.map((line) => line.split("").map(Number));

  heightMap.forEach((line, lineIndex) => {
    line.forEach((value, valueIndex) => {
      let valueLeft =
        line[valueIndex - 1] !== undefined
          ? line[valueIndex - 1]
          : Number.MAX_SAFE_INTEGER;

      let valueRight =
        line[valueIndex + 1] !== undefined
          ? line[valueIndex + 1]
          : Number.MAX_SAFE_INTEGER;

      let valueUp =
        heightMap[lineIndex - 1] !== undefined
          ? heightMap[lineIndex - 1][valueIndex]
          : Number.MAX_SAFE_INTEGER;

      let valueDown =
        heightMap[lineIndex + 1] !== undefined
          ? heightMap[lineIndex + 1][valueIndex]
          : Number.MAX_SAFE_INTEGER;

      if (
        valueLeft > value &&
        valueRight > value &&
        valueUp > value &&
        valueDown > value
      ) {
        sum += value + 1;
      }
    });
  });
  return sum;
};

const part2 = (input) => {
  // part 2

  return 0;
};

tests([
  { f: part1, input: _TESTinput, expected: 15 },
  { f: part1, input: _REALinput, expected: 594 },
  //{ f: part2, input: [], expected: 0 },
]);
