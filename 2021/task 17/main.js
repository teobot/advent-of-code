// Advent of code 2021 -- Filename : main.js
// Task link -- https://adventofcode.com/2021/day/17
// Github link -- https://github.com/teobot/advent-of-code/tree/main/2021/task%2017
// Created by Theo Clapperton

const { tests } = require("../../common/common");

const _REALinput = "target area: x=257..286, y=-101..-57";
const _TESTinput = "target area: x=20..30, y=-10..-5";

const parseInput = (input) => {
  let minX = parseInt(input.split(" ")[2].split("..")[0].split("=")[1]);
  let maxX = parseInt(input.split(" ")[2].split("..")[1]);
  let minY = parseInt(input.split(" ")[3].split("..")[0].split("=")[1]);
  let maxY = parseInt(input.split(" ")[3].split("..")[1]);
  return {
    minX,
    maxX,
    minY,
    maxY,
  };
};

const part1 = (input) => {
  let { minY } = parseInput(input);
  return ((minY * -1 - 1) * (minY * -1 - 1 + 1)) / 2;
};

const calculateIfVelocitySuccess = (input, initX, initY) => {
  let { minX, maxX, minY, maxY } = parseInput(input);
  let pos = { x: 0, y: 0 };
  let initVelocity = { x: initX, y: initY };
  let moving = true;
  let success = true;
  while (moving) {
    pos.x += initVelocity.x;
    pos.y += initVelocity.y;
    if (initVelocity.x > 0) {
      initVelocity.x--;
    } else if (initVelocity.x === 0) {
      initVelocity.x = 0;
    } else if (initVelocity.x < 0) {
      initVelocity.x++;
    }
    initVelocity.y--;
    if (pos.x >= minX && pos.x <= maxX && pos.y >= minY && pos.y <= maxY) {
      moving = false;
      success = true;
    } else if (pos.y < minY) {
      moving = false;
      success = false;
    }
  }
  return success;
};

const part2 = (input) => {
  // part 2
  let distinctValues = 0;
  let { minX, maxX, minY, maxY } = parseInput(input);

  for (let x = 0; x < maxX + 1; x++) {
    for (let y = minY; y < maxY * -2; y++) {
      if (calculateIfVelocitySuccess(input, x, y)) distinctValues++;
    }
  }

  return distinctValues;
};

tests([
  { f: part1, input: _TESTinput, expected: 45 },
  { f: part1, input: _REALinput, expected: 5050 },
  { f: part2, input: _TESTinput, expected: 112 },
  { f: part2, input: _REALinput, expected: 2223 },
]);
