// Advent of code 2021 -- Filename : main.js
// Task link -- https://adventofcode.com/2021/day/9
// Github link -- https://github.com/teobot/advent-of-code/tree/main/2021/task%209
// Created by Theo Clapperton

const { inputToArray, tests } = require("../../common/common");

const _REALinput = inputToArray("../2021/task 9/input.txt", "\n");
const _TESTinput = inputToArray("../2021/task 9/test.txt", "\n");

const part1 = (input) => {
  // part 1
  let sum = 0;
  let heightMap = input.map((line) => line.split("").map(Number));

  heightMap.forEach((line, lineIndex) => {
    line.forEach((value, valueIndex) => {
      let valueLeft =
        line[valueIndex - 1] !== undefined
          ? line[valueIndex - 1]
          : Number.MAX_SAFE_INTEGER;

      let valueRight =
        line[valueIndex + 1] !== undefined
          ? line[valueIndex + 1]
          : Number.MAX_SAFE_INTEGER;

      let valueUp =
        heightMap[lineIndex - 1] !== undefined
          ? heightMap[lineIndex - 1][valueIndex]
          : Number.MAX_SAFE_INTEGER;

      let valueDown =
        heightMap[lineIndex + 1] !== undefined
          ? heightMap[lineIndex + 1][valueIndex]
          : Number.MAX_SAFE_INTEGER;

      if (
        valueLeft > value &&
        valueRight > value &&
        valueUp > value &&
        valueDown > value
      ) {
        sum += value + 1;
      }
    });
  });
  return sum;
};

function floodFind(lineIndex, numberInLineIndex, floodMap) {
  if (floodMap[lineIndex][numberInLineIndex] === 1) return 0; // check node hasn't been visited

  floodMap[lineIndex][numberInLineIndex] = 1; // mark node as visited

  // count neighbors
  let sizeOfTheCurrentBasin = 1;

  if (lineIndex - 1 >= 0)
    sizeOfTheCurrentBasin += floodFind(
      lineIndex - 1,
      numberInLineIndex,
      floodMap
    ); // check if we can go up

  if (lineIndex + 1 < floodMap.length)
    sizeOfTheCurrentBasin += floodFind(
      lineIndex + 1,
      numberInLineIndex,
      floodMap
    ); // check if we can go down

  if (numberInLineIndex - 1 >= 0)
    sizeOfTheCurrentBasin += floodFind(
      lineIndex,
      numberInLineIndex - 1,
      floodMap
    ); // check if we can go left

  if (numberInLineIndex + 1 < floodMap[lineIndex].length)
    sizeOfTheCurrentBasin += floodFind(
      lineIndex,
      numberInLineIndex + 1,
      floodMap
    ); // check if we can go right

  return sizeOfTheCurrentBasin;
}

const part2 = (input) => {
  // part 2

  // convert all the numbers to 1's and 0's
  // covert 9s to 1s and everything else to 0s
  // the 1's are the limits of the different basins
  const floodMap = input.map((line) =>
    line
      .split("")
      .map(Number)
      .map((x) => (x === 9 ? 1 : 0))
  );

  let sizeOfBassins = [];

  for (let lineIndex = 0; lineIndex < input.length; lineIndex++) {
    const line = input[lineIndex];
    // foreach line in the map

    for (
      let lineNumberIndex = 0;
      lineNumberIndex < line.length;
      lineNumberIndex++
    ) {
      let sizeOfBassin = floodFind(lineIndex, lineNumberIndex, floodMap);

      // check if the size of the basin is large than 0
      if (sizeOfBassin > 0) sizeOfBassins.push(sizeOfBassin);
    }
  }

  // sort the basins by the size DESC
  sizeOfBassins.sort((a, b) => b - a);

  // return the top 3 bassins in size
  return sizeOfBassins[0] * sizeOfBassins[1] * sizeOfBassins[2];
};

tests([
  { f: part1, input: _TESTinput, expected: 15 },
  { f: part1, input: _REALinput, expected: 594 },
  { f: part2, input: _TESTinput, expected: 1134 },
  { f: part2, input: _REALinput, expected: 858494 },
]);
