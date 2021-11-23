// Advent of code 2018 -- Filename : main.js
// Task link -- https://adventofcode.com/2018/day/8
// Github link -- https://github.com/teobot/advent-of-code/tree/main/2018/task%208
// Created by Theo Clapperton
// Started @ 2021-11-23 12:41:05

const { inputToIntArray, tests } = require("../../common/common");

const _REALinput = inputToIntArray("../2018/task 8/input.txt", " ");

function part1(input) {
  // part 1

  return 0;
}

const part2 = (input) => {
  // part 2

  return 0;
};

tests([
  {
    f: part1,
    input: [2, 3, 0, 3, 10, 11, 12, 1, 1, 0, 1, 99, 2, 1, 1, 2],
    expected: 138,
  },
  {
    f: part1,
    input: _REALinput,
    expected: 42254,
  },
]);

// console.log({ task: 1, value: part1() });
//console.log({ task: 2, value: part2(_REALinput) });
