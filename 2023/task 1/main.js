// Advent of code 2023 -- Filename : main.js
// Task link -- https://adventofcode.com/2023/day/1
// Github link -- https://github.com/teobot/advent-of-code/tree/main/2023/task%201
// Input link -- https://adventofcode.com/2023/day/1/input
// Run Using -- node './2023/task 1/main.js'
// Created by Theo Clapperton

const { inputToArray, test, tests } = require("../../common/common");

const _REALinput = inputToArray("../2023/task 1/input.txt", "\n");
const _TESTinput = inputToArray("../2023/task 1/test.txt", "\r\n");
const _TESTinput2 = inputToArray("../2023/task 1/test2.txt", "\r\n");

const part1 = (input) => {
  // part 1
  return input
    .map((x) => {
      let numbers = x.match(/[1-9]/g);
      return `${numbers[0]}${numbers[numbers.length - 1]}`;
    })
    .map(Number)
    .reduce((a, b) => a + b, 0);
};

const part2 = (input) => {
  // part 2

  const digits = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];

  return part1(
    input
      .map((line) =>
        [
          ...line.matchAll(
            /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g
          ),
        ]
          .map((match) => match[1])
          .map((n) => parseInt(n) || digits.indexOf(n) + 1)
      )
      .map((line) => line.join(""))
  );
};

tests([
  test(part1, _TESTinput, 142),
  test(part1, _REALinput, 54644),
  test(part2, _TESTinput2, 281),
  test(part2, _REALinput, 53348),
]);
