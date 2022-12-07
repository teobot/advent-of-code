// Advent of code 2022 -- Filename : main.js
// Task link -- https://adventofcode.com/2022/day/7
// Github link -- https://github.com/teobot/advent-of-code/tree/main/2022/task%207
// Input link -- https://adventofcode.com/2022/day/7/input
// Run Using -- node './2022/task 7/main.js'
// Created by Theo Clapperton

const { inputToArray, test, tests } = require("../../common/common");

const _REALinput = inputToArray("../2022/task 7/input.txt", "\n");
const _TESTinput = inputToArray("../2022/task 7/test.txt", "\r\n");

const part1 = (input) => {
  // part 1
  let newDirectory = {};
  let currentLocation = [];

  newDirectory["/"] = {
    files: [],
    inside: null,
  };

  for (let i = 0; i < input.length; i++) {
    const line = input[i].trim().split(" ");
    let action = "nothing";

    if (line[0] === "$") {
      if (line[1] === "cd") {
        if (line[2] === "..") {
          // go up a directory
          currentLocation.pop();
          action = "go up a directory";
        } else {
          currentLocation.push(line[2]);
          action = "go to a directory";
        }
      }
    } else if (line[0] === "ls") {
    } else if (line[0] === "dir") {
      let newDirectoryName = line[1];
      newDirectory[newDirectoryName] = {
        files: [],
        inside: currentLocation[currentLocation.length - 1],
      };
      action = "create a directory";
    } else {
      // if the line is a number followed by a space and then a letter
      // add the file to the current directory
      action = "add a file";
      newDirectory[currentLocation[currentLocation.length - 1]].files = [
        ...newDirectory[currentLocation[currentLocation.length - 1]].files,
        parseInt(line[0]),
      ];
    }
  }

  // go through the newDirectory and add up the files in each directory and its subdirectories
  let total = {};
  console.log(newDirectory);

  for (let i = 0; i < Object.keys(newDirectory).length; i++) {
    const key = Object.keys(newDirectory)[i];
    const directory = newDirectory[key];
    let inside = directory.inside;
    let filesSum = directory.files.reduce((a, b) => a + b, 0);

    if (inside) {
      newDirectory[inside].sum += filesSum;
      total[key] = filesSum;
    }
  }

  let totalArray = [];
  for (let i = 0; i < Object.keys(newDirectory).length; i++) {
    const key = Object.keys(newDirectory)[i];
    const directory = newDirectory[key];
    let filesSum = directory.files.reduce((a, b) => a + b, 0);
    totalArray.push({
      name: key,
      sum: filesSum + directory.sum,
    });
  }

  return totalArray
    .filter((a) => a.sum <= 100000)
    .reduce((a, b) => a + b.sum, 0);
};

const part2 = (input) => {
  // part 2

  return 0;
};

tests([
  test(part1, _TESTinput, 95437),
  //test(part1, _REALinput, 1778099),
  //test(part2, _TESTinput, 0)
  //test(part2, _REALinput, 1623571)
]);
