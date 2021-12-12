// Advent of code 2021 -- Filename : main.js
// Task link -- https://adventofcode.com/2021/day/11
// Github link -- https://github.com/teobot/advent-of-code/tree/main/2021/task%2011
// Created by Theo Clapperton

const { inputToArray, tests, generateGrid } = require("../../common/common");

const _REALinput1 = inputToArray("../2021/task 11/input.txt", "\n").map((x) =>
  x.split("").map(Number)
);

const _REALinput2 = inputToArray("../2021/task 11/input.txt", "\n").map((x) =>
  x.split("").map(Number)
);

const _TESTinput1 = inputToArray("../2021/task 11/test.txt", "\n").map((x) =>
  x.split("").map(Number)
);

const _TESTinput2 = inputToArray("../2021/task 11/test.txt", "\n").map((x) =>
  x.split("").map(Number)
);

const incrementIndex = (input, rowIndex, squidIndex) => {
  if (input[rowIndex] !== undefined) {
    if (input[rowIndex][squidIndex] !== undefined) {
      if (input[rowIndex][squidIndex] !== 0) {
        input[rowIndex][squidIndex]++;
      }
    }
  }
  return input;
};

const spreadEnergy = (input, rowIndex, squidIndex) => {
  // increase the surrounding squares by 1

  incrementIndex(input, rowIndex - 1, squidIndex); // up

  incrementIndex(input, rowIndex - 1, squidIndex + 1); // top right

  incrementIndex(input, rowIndex, squidIndex + 1); // right

  incrementIndex(input, rowIndex + 1, squidIndex + 1); // bottom right

  incrementIndex(input, rowIndex + 1, squidIndex); // down

  incrementIndex(input, rowIndex + 1, squidIndex - 1); // bottom left

  incrementIndex(input, rowIndex, squidIndex - 1); // left

  incrementIndex(input, rowIndex - 1, squidIndex - 1); // top left

  return input;
};

const part1 = (input) => {
  // part 1
  let days = 100;
  let flashes = 0;

  for (let step = 0; step < days; step++) {
    // increase the energy of the squares by 1
    for (let rI = 0; rI < input.length; rI++) {
      // for each row
      for (let sI = 0; sI < input[rI].length; sI++) {
        input[rI][sI]++;
      }
    }

    let arrayChanged = false;

    while (!arrayChanged) {
      const prevArray = input.join("");
      for (let rowIndex = 0; rowIndex < input.length; rowIndex++) {
        // for each row
        for (
          let squidIndex = 0;
          squidIndex < input[rowIndex].length;
          squidIndex++
        ) {
          // for each squid
          if (input[rowIndex][squidIndex] > 9) {
            flashes++;
            input[rowIndex][squidIndex] = 0;
            input = spreadEnergy(input, rowIndex, squidIndex);
          }
        }
      }

      arrayChanged = input.join("") === prevArray;
    }
  }

  return flashes;
};

const part2 = (input) => {
  // part 2
  let syncFlash = false;
  let days = 0;
  const syncGrid = generateGrid(9, 9, 0);
  while (!syncFlash) {
    days++;
    // increase the energy of the squares by 1
    for (let rI = 0; rI < input.length; rI++) {
      // for each row
      for (let sI = 0; sI < input[rI].length; sI++) {
        input[rI][sI]++;
      }
    }

    let arrayChanged = false;

    while (!arrayChanged) {
      const prevArray = input.join("");
      for (let rowIndex = 0; rowIndex < input.length; rowIndex++) {
        // for each row
        for (
          let squidIndex = 0;
          squidIndex < input[rowIndex].length;
          squidIndex++
        ) {
          // for each squid
          if (input[rowIndex][squidIndex] > 9) {
            input[rowIndex][squidIndex] = 0;
            input = spreadEnergy(input, rowIndex, squidIndex);
          }
        }
      }
      arrayChanged = input.join("") === prevArray;
    }

    if (syncGrid.join("") === input.join("")) {
      syncFlash = true;
    }
  }

  return days;
};

tests([
  { f: part1, input: _TESTinput1, expected: 1656 },
  { f: part1, input: _REALinput1, expected: 1732 },
  { f: part2, input: _TESTinput2, expected: 195 },
  { f: part2, input: _REALinput2, expected: 290 },
]);
