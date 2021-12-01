// Advent of code 2021 -- Filename : main.js
// Task link -- https://adventofcode.com/2021/day/1
// Github link -- https://github.com/teobot/advent-of-code/tree/main/2021/task%201
// Created by Theo Clapperton

const { inputToIntArray, tests } = require("../../common/common");

const _REALinput = inputToIntArray("../2021/task 1/input.txt", "\n");

const part1OLD = (input) => {
  // part 1
  let sum = 0; // sum of all numbers
  for (let i = 0; i < input.length; i++) {
    if (input[i] < input[i + 1]) sum++; // if current number is less than next number, add to sum
  }
  return sum; // return sum
};

const part1 = (_i) => {
  // optimized part 1
  return _i.filter((a, i) => a < _i[i + 1]).length;
};

const part2 = (input) => {
  // part 2
  let sum = -1; // sum of all numbers
  let prevGroup = 0; // previous group
  for (let i = 0; i < input.length; i++) {
    // if current number is less than next number, add to sum
    let currentGroup = [input[i], input[i + 1], input[i + 2]].reduce(
      (a, b) => a + b,
      0
    ); // current sum of group
    if (currentGroup > prevGroup) sum++; // if current group is bigger than previous group, add to sum
    prevGroup = currentGroup; // set current group as previous group
  }
  return sum;
};

tests([
  {
    f: part1,
    input: [199, 200, 208, 210, 200, 207, 240, 269, 260, 263],
    expected: 7,
  },
  { f: part1, input: _REALinput, expected: 1502 },
  {
    f: part2,
    input: [199, 200, 208, 210, 200, 207, 240, 269, 260, 263],
    expected: 5,
  },
  { f: part2, input: _REALinput, expected: 1538 },
]);
