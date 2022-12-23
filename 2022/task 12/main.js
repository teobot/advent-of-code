// Advent of code 2022 -- Filename : main.js
// Task link -- https://adventofcode.com/2022/day/12
// Github link -- https://github.com/teobot/advent-of-code/tree/main/2022/task%2012
// Input link -- https://adventofcode.com/2022/day/12/input
// Run Using -- node './2022/task 12/main.js'
// Created by Theo Clapperton

const { inputToArray, test, tests } = require("../../common/common");

const _REALinput = inputToArray("../2022/task 12/input.txt", "\r\n");
const _TESTinput = inputToArray("../2022/task 12/test.txt", "\r\n");

const part1 = (input) => {
  // part 1

  console.table(
    input.map((line) => {
      // convert a-z to 0-25
      return line.split("").map((char) => {
        return char.charCodeAt(0) - 97;
      });
    })
  );
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
