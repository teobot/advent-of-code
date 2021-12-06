// Advent of code 2021 -- Filename : main.js
// Task link -- https://adventofcode.com/2021/day/6
// Github link -- https://github.com/teobot/advent-of-code/tree/main/2021/task%206
// Created by Theo Clapperton

const { inputToArray, tests } = require("../../common/common");

const _REALinput = inputToArray("../2021/task 6/input.txt", ",").map(Number);

const part1 = ({ days, input }) => {
  // part 1
  let fishAtEachAgeCount = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  // the first index is the count of fish that on the last day before production,
  // the last index is the count of fish that have just been produced

  input.forEach((fish) => {
    fishAtEachAgeCount[fish]++; // add a fish to the count of fish at each age
  });

  for (let day = 0; day < days; day++) {
    // for each day
    const fishReadyToProduce = fishAtEachAgeCount[0]; // the number of fish that are ready to be produced

    for (let j = 0; j < fishAtEachAgeCount.length - 1; j++) {
      // for each age group
      fishAtEachAgeCount[j] = fishAtEachAgeCount[j + 1]; // move the fish from the next age group to the current age group
    }

    fishAtEachAgeCount[fishAtEachAgeCount.length - 1] = fishReadyToProduce; // the fish that just reproduced are in the last age group as they need rest
    fishAtEachAgeCount[6] += fishReadyToProduce; // the fish that just reproduced are in the second last age group as they need 6 days to mature
  }

  return fishAtEachAgeCount.reduce((acc, curr) => acc + curr); // sum all the ages groups together
};

const part2 = ({ days, input }) => {
  // part 2
  return part1({ days, input });
};

tests([
  {
    f: part1,
    input: { days: 80, input: "3,4,3,1,2".split(",").map(Number) },
    expected: 5934,
  },
  { f: part1, input: { days: 80, input: _REALinput }, expected: 360610 },
  {
    f: part2,
    input: { days: 256, input: "3,4,3,1,2".split(",").map(Number) },
    expected: 26984457539,
  },
  {
    f: part2,
    input: { days: 256, input: _REALinput },
    expected: 1631629590423,
  },
]);
