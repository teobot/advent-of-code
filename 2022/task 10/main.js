// Advent of code 2022 -- Filename : main.js
// Task link -- https://adventofcode.com/2022/day/10
// Github link -- https://github.com/teobot/advent-of-code/tree/main/2022/task%2010
// Input link -- https://adventofcode.com/2022/day/10/input
// Run Using -- node './2022/task 10/main.js'
// Created by Theo Clapperton

const { inputToArray, test, tests } = require("../../common/common");

const _REALinput = inputToArray("../2022/task 10/input.txt", "\n");
const _TESTinput = inputToArray("../2022/task 10/test.txt", "\r\n");

const part1 = (input) => {
  // part 1

  let counter = 1;
  let total = 0;
  let nthCycle = 20;
  let x = 1;

  input
    .map((command) => {
      let ii = command === "noop" ? counter++ : (counter += 2);
      return {
        com: command,
        ind: ii,
        val: parseInt(command.split(" ")[1]),
      };
    })
    .filter((command) => command.com !== "noop")
    .forEach(({ com, ind, val }) => {
      if (ind > nthCycle) {
        total += nthCycle * x;
        nthCycle += 40;
      }
      x += val;
    });

  return total;
};

const part2 = (input) => {
  // part 2
  let x = 1;
  let cycle = 0;
  let row = 0;
  let column = 0;
  let grid = [];

  for (let i = 0; i < input.length; i++) {
    const [instruction, value] = input[i].split(" ");
    cycle++;
    if (!grid[row]) {
      grid[row] = [];
    }
    grid[row][column] = getChar(column, x);
    if (column === 39) {
      // end of the row go to next row
      row++;
      column = 0;
    } else {
      column++;
    }
    if (instruction === "addx") {
      cycle++;
      if (!grid[row]) {
        grid[row] = [];
      }
      grid[row][column] = getChar(column, x);
      if (column === 39) {
        // end of the row go to next row
        row++;
        column = 0;
      } else {
        column++;
      }
      x += parseInt(value);
    }
  }

  grid.forEach((row) => console.log(row.join("")));

  return 0;
};

const getChar = (col, x) => {
  if (col === x - 1 || col === x || col === x + 1) {
    return "#";
  } else {
    return ".";
  }
};

tests([
  //test(part1, _TESTinput, 13140),
  //test(part1, _REALinput, 13480),
  //test(part2, _TESTinput, 0),
  test(part2, _REALinput, 0),
]);
