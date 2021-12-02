// Advent of code 2021 -- Filename : main.js
// Task link -- https://adventofcode.com/2021/day/2
// Github link -- https://github.com/teobot/advent-of-code/tree/main/2021/task%202
// Created by Theo Clapperton

const { inputToArray, tests } = require("../../common/common");

const _REALinput = inputToArray("../2021/task 2/input.txt", "\n");

const part1 = (input) => {
  // part 1
  let pos = { hoz: 0, dep: 0 }; // track hoz and dep
  input.forEach((instruction) => {
    // for each instruction
    let [op, val] = instruction.split(" "); // split instruction into op and val
    switch (op) {
      case "up":
        pos.dep += parseInt(val);
        break;
      case "down":
        pos.dep -= parseInt(val);
        break;
      case "forward":
        pos.hoz += parseInt(val);
        break;
      default:
        break;
    }
  });
  return pos.hoz * (pos.dep * -1); // return the product of hoz and dep
};

const part2 = (input) => {
  // part 2
  let pos = { hoz: 0, dep: 0, aim: 0 }; // track hoz, dep and aim
  input.forEach((instruction) => {
    // for each instruction
    let [op, val] = instruction.split(" "); // split instruction into op and val
    switch (op) {
      case "up":
        pos.aim -= parseInt(val);
        break;
      case "down":
        pos.aim += parseInt(val);
        break;
      case "forward":
        pos.hoz += parseInt(val);
        pos.dep += pos.aim * parseInt(val);
        break;
      default:
        break;
    }
  });
  return pos.hoz * pos.dep; // return the product of hoz and dep
};

tests([
  {
    f: part1,
    input: ["forward 5", "down 5", "forward 8", "up 3", "down 8", "forward 2"],
    expected: 150,
  },
  { f: part1, input: _REALinput, expected: 2120749 },
  {
    f: part2,
    input: ["forward 5", "down 5", "forward 8", "up 3", "down 8", "forward 2"],
    expected: 900,
  },
  { f: part2, input: _REALinput, expected: 2138382217 },
]);
