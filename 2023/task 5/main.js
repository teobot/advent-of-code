// Advent of code 2023 -- Filename : main.js
// Task link -- https://adventofcode.com/2023/day/5
// Github link -- https://github.com/teobot/advent-of-code/tree/main/2023/task%205
// Input link -- https://adventofcode.com/2023/day/5/input
// Run Using -- node './2023/task 5/main.js'
// Created by Theo Clapperton

const { inputToArray, test, tests } = require("../../common/common");

const _REALinput = inputToArray("../2023/task 5/input.txt", "\n\n");
const _TESTinput = inputToArray("../2023/task 5/test.txt", "\r\n\r\n");

const part1 = (input) => {
  // part 1
  const seeds = input.shift();

  input = input.map((x) => {
    const [food, production] = x.split(":\r\n");
    return { food, production: production.split("\r\n") };
  });
  console.log(input);
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
