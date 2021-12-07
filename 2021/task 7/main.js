// Advent of code 2021 -- Filename : main.js
// Task link -- https://adventofcode.com/2021/day/7
// Github link -- https://github.com/teobot/advent-of-code/tree/main/2021/task%207
// Created by Theo Clapperton

const { inputToArray, tests } = require("../../common/common");

const _REALinput = inputToArray("../2021/task 7/input.txt", ",");

const calculateFuel = (pos1, pos2) => {
  let distance = Math.abs(pos1 - pos2);
  let t = 0;
  if (distance > 0) {
    for (let i = 1; i < distance + 1; i++) {
      t += i;
    }
  }

  return t;
};

const part1 = (input) => {
  // part 1
  let cheapest = Number.MAX_SAFE_INTEGER;
  input.forEach((position) => {
    // calculate the carbs cost to move
    let totalCost = 0;

    input.forEach((otherPos) => {
      totalCost += Math.abs(position - otherPos);
    });

    if (totalCost < cheapest) {
      cheapest = totalCost;
    }
  });
  return cheapest;
};

const part2 = (input) => {
  // part 2
  let cheapest = Number.MAX_SAFE_INTEGER;

  for (let i = Math.min(...input); i <= Math.max(...input); i++) {
    // calculate the carbs cost to move
    let totalCost = 0;

    input.forEach((otherPos) => {
      totalCost += calculateFuel(i, otherPos);
    });

    if (totalCost < cheapest) {
      cheapest = totalCost;
    }
  }

  return cheapest;
};

tests([
  {
    f: part1,
    input: "16,1,2,0,4,2,7,1,2,14".split(",").map(Number),
    expected: 37,
  },
  { f: part1, input: _REALinput, expected: 356179 },
  {
    f: part2,
    input: "16,1,2,0,4,2,7,1,2,14".split(",").map(Number),
    expected: 168,
  },
  { f: part2, input: _REALinput, expected: 99788435 },
]);
