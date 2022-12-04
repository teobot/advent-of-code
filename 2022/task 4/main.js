// Advent of code 2022 -- Filename : main.js
// Task link -- https://adventofcode.com/2022/day/4
// Github link -- https://github.com/teobot/advent-of-code/tree/main/2022/task%204
// Input link -- https://adventofcode.com/2022/day/4/input
// Run Using -- node './2022/task 4/main.js'
// Created by Theo Clapperton

const { inputToArray, test, tests } = require("../../common/common");

const _REALinput = inputToArray("../2022/task 4/input.txt", "\n");
const _TESTinput = inputToArray("../2022/task 4/test.txt", "\r\n");

const part1 = (input) => {
  // part 1
  let total = 0;
  input.forEach((set, index) => {
    let [range1, range2] = set.split(",");
    range1 = range1.split("-").map(Number);
    range2 = range2.split("-").map(Number);

    if (
      (isBetween(range2[0], range2[1], range1[0]) &&
        isBetween(range2[0], range2[1], range1[1])) ||
      (isBetween(range1[0], range1[1], range2[0]) &&
        isBetween(range1[0], range1[1], range2[1]))
    ) {
      total++;
    }
  });

  return total;
};

const part2 = (input) => {
  // part 2
  let total = 0;
  input.forEach((set, index) => {
    let [range1, range2] = set.split(",");
    range1 = range1.split("-").map(Number);
    range2 = range2.split("-").map(Number);

    let obj = {};
    for (let i = range1[0]; i <= range1[1]; i++) {
      if (obj[i]) {
        obj[i]++;
      } else obj[i] = 1;
    }
    for (let i = range2[0]; i <= range2[1]; i++) {
      if (obj[i]) {
        obj[i]++;
      } else obj[i] = 1;
    }
    // for all in the obj check if the value is 2
    for (let i in obj) {
      if (obj[i] === 2) {
        total++;
        break;
      }
    }
  });

  return total;
};

const isBetween = (lowerBound, upperBound, value) => {
  // check if value is between the upper and lower bound
  return value >= lowerBound && value <= upperBound;
};

tests([
  test(part1, _TESTinput, 2),
  test(part1, _REALinput, 466),
  test(part2, _TESTinput, 4),
  test(part2, _REALinput, 865),
]);
