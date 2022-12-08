// Advent of code 2022 -- Filename : main.js
// Task link -- https://adventofcode.com/2022/day/8
// Github link -- https://github.com/teobot/advent-of-code/tree/main/2022/task%208
// Input link -- https://adventofcode.com/2022/day/8/input
// Run Using -- node './2022/task 8/main.js'
// Created by Theo Clapperton

const { inputToArray, test, tests } = require("../../common/common");

const _REALinput = inputToArray("../2022/task 8/input.txt", "\n");
const _TESTinput = inputToArray("../2022/task 8/test.txt", "\r\n");

const part1 = (input) => {
  // part 1
  let treeArray = input.map((row) => row.split("").map(Number));
  let trees = (input.length + input[0].length - 2) * 2;

  for (let rowIndex = 1; rowIndex < treeArray.length - 1; rowIndex++) {
    const row = treeArray[rowIndex];
    for (let columnIndex = 1; columnIndex < row.length - 1; columnIndex++) {
      const tree = row[columnIndex];

      let aboveBlocked = false;
      let belowBlocked = false;
      let leftBlocked = false;
      let rightBlocked = false;

      // check if there is any tree above that are bigger
      for (let yy = 0; yy < rowIndex; yy++) {
        if (treeArray[yy][columnIndex] >= tree) {
          aboveBlocked = true;
          break;
        }
      }

      if (aboveBlocked) {
        // check if there is any tree below that are bigger
        for (let yy = rowIndex + 1; yy < input.length; yy++) {
          if (treeArray[yy][columnIndex] >= tree) {
            belowBlocked = true;
            break;
          }
        }
      }

      if (aboveBlocked && belowBlocked) {
        // check if there is any to the left that are bigger
        for (let xx = 0; xx < columnIndex; xx++) {
          if (treeArray[rowIndex][xx] >= tree) {
            leftBlocked = true;
            break;
          }
        }
      }

      if (aboveBlocked && belowBlocked && leftBlocked) {
        // check if there is any to the right that are bigger
        for (let xx = columnIndex + 1; xx < row.length; xx++) {
          if (treeArray[rowIndex][xx] >= tree) {
            rightBlocked = true;
            break;
          }
        }
      }

      // if at least one of the routes isnt blocked, then the tree is visible
      if (aboveBlocked && belowBlocked && leftBlocked && rightBlocked) {
        // tree is blocked
      } else {
        trees++;
      }
    }
  }

  return trees;
};

const part2 = (input) => {
  // part 2
  let treeArray = input.map((row) => row.split("").map(Number));
  let scenicScores = [];

  for (let rowIndex = 1; rowIndex < treeArray.length - 1; rowIndex++) {
    const row = treeArray[rowIndex];
    for (let columnIndex = 1; columnIndex < row.length - 1; columnIndex++) {
      const tree = row[columnIndex];

      let treesAbove = 0;
      let treesBelow = 0;
      let treesLeft = 0;
      let treesRight = 0;

      // check if there is any tree above that are bigger
      for (let yy = rowIndex - 1; yy >= 0; yy--) {
        if (treeArray[yy][columnIndex] >= tree) {
          treesAbove += 1;
          break;
        } else {
          treesAbove++;
        }
      }

      // check if there is any tree below that are bigger
      for (let yy = rowIndex + 1; yy < input.length; yy++) {
        if (treeArray[yy][columnIndex] >= tree) {
          treesBelow += 1;
          break;
        } else {
          treesBelow++;
        }
      }

      // check if there is any to the left that are bigger
      for (let xx = columnIndex - 1; xx > -1; xx--) {
        if (treeArray[rowIndex][xx] >= tree) {
          treesBelow += 1;
          break;
        } else {
          treesLeft++;
        }
      }

      // check if there is any to the right that are bigger
      for (let xx = columnIndex + 1; xx < row.length; xx++) {
        if (treeArray[rowIndex][xx] >= tree) {
          treesRight += 1;
          break;
        } else {
          treesRight++;
        }
      }

      let viewingDistance = treesAbove * treesBelow * treesLeft * treesRight;

      scenicScores.push(viewingDistance);
    }
  }

  return Math.max(...scenicScores);
};

tests([
  test(part1, _TESTinput, 21),
  test(part1, _REALinput, 1832),
  test(part2, _TESTinput, 8),
  test(part2, _REALinput, 157320),
]);
