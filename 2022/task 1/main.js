// Advent of code 2022 -- Filename : main.js
// Task link -- https://adventofcode.com/2022/day/1
// Github link -- https://github.com/teobot/advent-of-code/tree/main/2022/task%201
// Run Using -- node './2022/task 1/main.js'
// Created by Theo Clapperton

const { inputToArray, test, tests } = require("../../common/common");

const _REALinput = inputToArray("../2022/task 1/input.txt", "\n\n");
const _TESTinput = inputToArray("../2022/task 1/test.txt", "\r\n\r\n");

const part1 = (input) => {
  // part 1
  let hc = 0;
  input.forEach((elf) => {
    let sum = elf
      .split("\n")
      .map(Number)
      .reduce((a, b) => a + b);
    if (sum > hc) hc = sum;
  });
  return hc;
};

const part2 = (input) => {
  // part 2
  let totals = [];
  input.forEach((elf) => {
    totals.push(
      elf
        .split("\n")
        .map(Number)
        .reduce((a, b) => a + b)
    );
  });

  // order the totals by the highest and sum that first 3 together
  return totals
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a + b);
};

tests([
  test(part1, _TESTinput, 24000),
  test(part1, _REALinput, 68292),
  test(part2, _TESTinput, 45000),
  test(part2, _REALinput, 203203),
]);
