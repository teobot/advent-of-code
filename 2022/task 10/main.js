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

let crtGrid = [
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
].map((row) => row.split(""));

const part2 = (input) => {
  // part 2

  let counter = 1;
  let commands = input
    .map((command) => {
      let ii = command === "noop" ? counter++ : (counter += 2);
      return {
        com: command,
        ind: ii,
        val: parseInt(command.split(" ")[1]),
      };
    })
    .filter((command) => command.com !== "noop");

  let nthCycle = 40;
  let row = 0;
  let column = 0;
  let x = 1;

  for (let i = 1; i < 241; i++) {
    let movement = commands.find((command) => command.ind === i);
    if (movement) {
      x += movement.val;
    }
    if (i > nthCycle) {
      nthCycle += 40;
      row++;
      x = 1;
      column = 0;
    }

    if (column === x - 1 || column === x || column === x + 1)
      crtGrid[row][column] = "#";

    column++;
  }

  crtGrid.forEach((row) => console.log(row.join("")));

  return 0;
};

tests([
  //test(part1, _TESTinput, 13140),
  //test(part1, _REALinput, 13480),
  //test(part2, _TESTinput, 0),
  test(part2, _REALinput, 0)
]);
