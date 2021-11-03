// Advent of code 2017 -- Filename : main.js
// Task link -- https://adventofcode.com/2017/day/3
// Github link -- https://github.com/teobot/advent-of-code/tree/main/2017/task%203
// Created by Theo Clapperton
// Started @ 2021-11-03 11:34:39

const { isOdd, tests } = require("../../common/common");

const part1 = (input) => {
  // part 1
  let cornersTurned = 0;
  let firstCornerAfterInput = 1;
  let stepsTaken = 0;

  // while incrementing value is less than input
  while (firstCornerAfterInput < input) {

    // if the numbers of corners divided by 4 is odd, meaning we've turned all the way around,
    // also meaning we've gone through all the corners, we can increment the number of steps it nows takes to get to the center.
    if (cornersTurned % 4 === 0) {
      // finished a square loop so increment steps it takes to get to the center
      stepsTaken += 2;
    }

    firstCornerAfterInput += stepsTaken;
    cornersTurned++;
  }

  // we are at the first corner past our target
  return stepsTaken / 2 + Math.abs(firstCornerAfterInput - stepsTaken / 2 - input);
};

const part2 = (input) => {
  // part 2

  return 0;
};

tests([
  { f: part1, input: 1, expected: 0 },
  { f: part1, input: 12, expected: 3 },
  { f: part1, input: 23, expected: 2 },
  { f: part1, input: 1024, expected: 31 },
  { f: part1, input: 21, expected: 4 },
  { f: part1, input: 25, expected: 4 },
  { f: part1, input: 368078, expected: 371 },
]);

console.log({ task: 1, value: part1(368078) });
// console.log({task: 2, value: part2(_REALinput)});
