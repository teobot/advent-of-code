// Advent of code 2022 -- Filename : main.js
// Task link -- https://adventofcode.com/2022/day/11
// Github link -- https://github.com/teobot/advent-of-code/tree/main/2022/task%2011
// Input link -- https://adventofcode.com/2022/day/11/input
// Run Using -- node './2022/task 11/main.js'
// Created by Theo Clapperton

const { inputToArray, test, tests } = require("../../common/common");

const _REALinput = inputToArray("../2022/task 11/input.txt", "separator");
const _TESTinput = inputToArray("../2022/task 11/test.txt", "\r\n\r\n");

const part1 = (input) => {
  // part 1

  let startingInput = input.map((section) => {
    const [monkey, startingItems, operation, test, test1, test2] =
      section.split("\r\n");
    return {
      monkey: parseInt(monkey.charAt(monkey.length - 2)),
      startingItems: startingItems.split(": ").pop().split(", ").map(Number),
      operation: operation.split(": ")[1],
      test: test.split(": ")[1],
      test1: test1.split(": ").map((item) => item.trim()),
      test2: test2.split(": ").map((item) => item.trim()),
    };
  });

  console.log(startingInput);
  return 0;
};

const part2 = (input) => {
  // part 2

  return 0;
};

tests([
  test(part1, _TESTinput, 0),
  //test(part1, _REALinput, 0)
  //test(part2, _TESTinput, 0)
  //test(part2, _REALinput, 0)
]);
