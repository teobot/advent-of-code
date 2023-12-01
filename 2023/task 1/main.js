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
  // part 2 // TODO FIX THIS ITS GIVING 53346 WHICH IS LOW SHOULD BE 53348

  input = input.map((word) => {
    // remove all digits
    // 53346 is low

    const ar = [
      {
        word: "one",
        number: "1",
      },
      {
        word: "two",
        number: "2",
      },
      {
        word: "three",
        number: "3",
      },
      {
        word: "four",
        number: "4",
      },
      {
        word: "five",
        number: "5",
      },
      {
        word: "six",
        number: "6",
      },
      {
        word: "seven",
        number: "7",
      },
      {
        word: "eight",
        number: "8",
      },
      {
        word: "nine",
        number: "9",
      },
    ];

    ar.map((x) => {
      return {
        ...x,
        indexOf: word.indexOf(x.word),
      };
    })
      .sort((a, b) => a.indexOf - b.indexOf)
      .forEach((x) => {
        if (x.indexOf !== -1) {
          word = word.replace(x.word, x.number);
        }
      });

    return word;
  });

  return part1(input);
};

tests([
  test(part1, _TESTinput, 142),
  test(part1, _REALinput, 54644),
  test(part2, _TESTinput2, 281),
  test(part2, _REALinput, 53348),
]);
