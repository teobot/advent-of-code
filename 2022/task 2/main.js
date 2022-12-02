// Advent of code 2022 -- Filename : main.js
// Task link -- https://adventofcode.com/2022/day/2
// Github link -- https://github.com/teobot/advent-of-code/tree/main/2022/task%202
// Run Using -- node './2022/task 2/main.js'
// Created by Theo Clapperton

const { inputToArray, test, tests } = require("../../common/common");

const _REALinput = inputToArray("../2022/task 2/input.txt", "\n");
const _TESTinput = inputToArray("../2022/task 2/test.txt", "\r\n");

const scoreCard = {
  A: { X: 4, Y: 8, Z: 3 },
  B: { X: 1, Y: 5, Z: 9 },
  C: { X: 7, Y: 2, Z: 6 },
};

const scoreCardPart2 = {
  A: { X: 3, Y: 4, Z: 8 },
  B: { X: 1, Y: 5, Z: 9 },
  C: { X: 2, Y: 6, Z: 7 },
};

const part1 = (input) => {
  // part 1
  let score = 0;
  input.forEach((game) => {
    let [oppChoice, playerChoice] = game.split(" ");
    score += scoreCard[oppChoice][playerChoice];
  });
  return score;
};

const part2 = (input) => {
  // part 2
  let score = 0;
  input.forEach((game) => {
    let [oppChoice, playerChoice] = game.split(" ");
    score += scoreCardPart2[oppChoice][playerChoice];
  });
  return score;
};

tests([
  test(part1, _TESTinput, 15),
  test(part1, _REALinput, 10941),
  test(part2, _TESTinput, 12),
  test(part2, _REALinput, 13071),
]);
