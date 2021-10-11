// Advent of code 2016 -- Filename : main.js
// Created by Theo Clapperton
// Started @ 2021-10-11 19:07:56
// Finished @ 2021-10-11 19:29:09
// Time Taken = 0 hours, 21 minutes and 13 seconds

const { inputToArray } = require("../../common/common");

const _REALinput = inputToArray("../2016/task 2/input.txt", "\n");

const _TESTinput = ["ULL", "RRDDD", "LURDL", "UUUUD"];

const keypad = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const hardKeypad = [
  [null, null, 1, null, null],
  [null, 2, 3, 4, null],
  [5, 6, 7, 8, 9],
  [null, "A", "B", "C", null],
  [null, null, "D", null, null],
];

const part1 = (input) => {
  // part 1

  let location = [1, 1];
  let code = "";

  for (let i = 0; i < input.length; i++) {
    const instructions = input[i];

    if (!instructions) continue;

    for (let ii = 0; ii < instructions.split("").length; ii++) {
      const direction = instructions.split("")[ii];
      switch (direction) {
        case "U":
          if (location[0] > 0) {
            location[0]--;
          }
          break;
        case "D":
          if (location[0] < 2) {
            location[0]++;
          }
          break;
        case "L":
          if (location[1] > 0) {
            location[1]--;
          }
          break;
        case "R":
          if (location[1] < 2) {
            location[1]++;
          }
          break;
        default:
          break;
      }
    }

    code += keypad[location[0]][location[1]];
  }

  return code;
};

const part2 = (input) => {
  // part 2

  let location = [2, 0];
  let code = "";

  for (let i = 0; i < input.length; i++) {
    const instructions = input[i];

    if (!instructions) continue;

    for (let ii = 0; ii < instructions.split("").length; ii++) {
      const direction = instructions.split("")[ii];

      switch (direction) {
        case "U":
          if (location[0] > 0 && hardKeypad[location[0] - 1][location[1]]) {
            location[0]--;
          }
          break;
        case "D":
          if (location[0] < 4 && hardKeypad[location[0] + 1][location[1]]) {
            location[0]++;
          }
          break;
        case "L":
          if (location[1] > 0 && hardKeypad[location[0]][location[1] - 1]) {
            location[1]--;
          }
          break;
        case "R":
          if (location[1] < 4 && hardKeypad[location[0]][location[1] + 1]) {
            location[1]++;
          }
          break;
        default:
          break;
      }
    }

    code += hardKeypad[location[0]][location[1]];
  }

  return code;
};

console.log({ task: 1, value: part1(_REALinput) });
console.log({ task: 2, value: part2(_REALinput) });
