// Advent of code 2023 -- Filename : main.js
// Task link -- https://adventofcode.com/2023/day/4
// Github link -- https://github.com/teobot/advent-of-code/tree/main/2023/task%204
// Input link -- https://adventofcode.com/2023/day/4/input
// Run Using -- node './2023/task 4/main.js'
// Created by Theo Clapperton

const { inputToArray, test, tests } = require("../../common/common");

const _REALinput = inputToArray("../2023/task 4/input.txt", "\n");
const _TESTinput = inputToArray("../2023/task 4/test.txt", "\r\n");

const part1 = (input) => {
  // part 1
  input = input.map((game) => {
    const [winningNumbers, numbers] = game.split(" | ");
    return {
      winningNumbers: winningNumbers.split(": ")[1].match(/\d+/g).map(Number),
      numbers: numbers.match(/\d+/g).map(Number),
    };
  });

  input.forEach((game) => {
    const { winningNumbers, numbers } = game;
    let score = 0;
    numbers.forEach((number) => {
      if (winningNumbers.includes(number)) {
        if (score === 0) {
          score = 1;
        } else {
          score *= 2;
        }
      }
    });
    game.score = score;
  });

  return input.reduce((acc, game) => acc + game.score, 0);
};

const part2 = (input) => {
  // part 2
  input = input.map((game) => {
    const [winningNumbers, numbers] = game.split(" | ");
    return {
      winningNumbers: winningNumbers.split(": ")[1].match(/\d+/g).map(Number),
      numbers: numbers.match(/\d+/g).map(Number),
    };
  });

  input.forEach((game) => {
    const { winningNumbers, numbers } = game;
    let score = 0;
    numbers.forEach((number) => {
      if (winningNumbers.includes(number)) {
        if (score === 0) {
          score = 1;
        } else {
          score *= 2;
        }
      }
    });
    game.score = score;
  });

  input.forEach((game) => {
    const { winningNumbers, numbers } = game;
    winningNumbers.forEach((number, index) => {
      if (numbers.includes(number)) {
        game.cards = game.cards ? game.cards.concat([index]) : [index];
      }
    });
  });

  input = input.filter((game) => game.cards);

  console.log(input);

  let tally = 0;
  input.forEach((game) => {
    const { cards } = game;
  });

  return tally;
};

tests([
  test(part1, _TESTinput, 13),
  test(part1, _REALinput, 21213),
  test(part2, _TESTinput, 30),
  //test(part2, _REALinput, 0)
]);
