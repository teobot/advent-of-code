// Advent of code 2015 -- Filename : main.js
// Created by Theo Clapperton
// Started @ 2021-10-11 18:38:14
// Finished @ 2021-10-11 19:06:47
// Time Taken = 0 hours, 28 minutes and 33 seconds

const { inputToArray } = require("../../common/common");

const _REALinput = inputToArray("../2015/task 2/input.txt", "\n");

const _TESTinput = ["2x3x4", "1x1x10"];

const part1 = (input) => {
  // part 1

  let total = 0;

  for (let i = 0; i < input.length - 1; i++) {
    const boxDim = input[i].split("x");

    let length = parseInt(boxDim[0]);
    let width = parseInt(boxDim[1]);
    let height = parseInt(boxDim[2]);

    let surfaceArea =
      2 * length * width + 2 * width * height + 2 * height * length;

    let smallestSide = Math.min(
      length * width,
      width * height,
      height * length
    );

    total += surfaceArea + smallestSide;
  }

  return total;
};

const part2 = (input) => {
  // part 2

  let total = 0;

  for (let i = 0; i < input.length; i++) {
    const box = input[i].split("x");

    if (!input[i]) {
      continue;
    }

    let length = parseInt(box[0]);
    let width = parseInt(box[1]);
    let height = parseInt(box[2]);

    let smallestvalues = [length, width, height].sort((a, b) => a - b);

    let smallestSide =
      smallestvalues[0] +
      smallestvalues[0] +
      smallestvalues[1] +
      smallestvalues[1];

    let volume = length * width * height;

    total += volume + smallestSide;
  }

  return total;
};

console.log({ task: 1, value: part1(_REALinput) });
console.log({ task: 2, value: part2(_REALinput) });
