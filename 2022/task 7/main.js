// Advent of code 2022 -- Filename : main.js
// Task link -- https://adventofcode.com/2022/day/7
// Github link -- https://github.com/teobot/advent-of-code/tree/main/2022/task%207
// Input link -- https://adventofcode.com/2022/day/7/input
// Run Using -- node './2022/task 7/main.js'
// Created by Theo Clapperton

const { inputToArray, test, tests } = require("../../common/common");

const _REALinput = inputToArray("../2022/task 7/input.txt", "\r\n");
const _TESTinput = inputToArray("../2022/task 7/test.txt", "\r\n");

const part1 = (input) => {
  // part 1
  let directories = { "/": { parent: "", files: [], directories: [] } };
  let currentDirectory = "";

  for (let i = 0; i < input.length; i++) {
    const section = input[i].split(" ");
    if (section[0] === "$") {
      if (section[1] === "cd") {
        if (section[2] === "/") {
          currentDirectory = "/";
        } else if (section[2] === "..") {
          let paths = currentDirectory.split("/");
          currentDirectory = paths.slice(0, paths.length - 1).join("/");
        } else {
          currentDirectory =
            (currentDirectory == "/"
              ? currentDirectory
              : currentDirectory + "/") + section[2];
        }
      }
    } else {
      // not a $ command
      if (section[0] === "dir") {
        let newDirectory =
          (currentDirectory == "/"
            ? currentDirectory
            : currentDirectory + "/") + section[1];
        directories[newDirectory] = {
          parent: currentDirectory,
          files: [],
          directories: [],
        };

        directories[currentDirectory].directories.push(newDirectory);
      } else {
        directories[currentDirectory].files.push({
          file: section[1],
          fileSize: parseInt(section[0]),
        });
      }
    }
  }

  const recursiveSum = (directory) => {
    return (
      directories[directory].files.reduce(
        (acc, file) => acc + file.fileSize,
        0
      ) +
      directories[directory].directories.reduce(
        (acc, child) => acc + recursiveSum(child),
        0
      )
    );
  };

  return Object.keys(directories).reduce((acc, key) => {
    let total = recursiveSum(key);
    if (total <= 100000) acc += total;
    return acc;
  }, 0);
};

const part2 = (input) => {
  // part 2
  let diskSpace = 70000000;
  let unusedSpace = 30000000;
  let directories = { "/": { parent: "", files: [], directories: [] } };
  let currentDirectory = "";

  for (let i = 0; i < input.length; i++) {
    const section = input[i].split(" ");
    if (section[0] === "$") {
      if (section[1] === "cd") {
        if (section[2] === "/") {
          currentDirectory = "/";
        } else if (section[2] === "..") {
          let paths = currentDirectory.split("/");
          currentDirectory = paths.slice(0, paths.length - 1).join("/");
        } else {
          currentDirectory =
            (currentDirectory == "/"
              ? currentDirectory
              : currentDirectory + "/") + section[2];
        }
      }
    } else {
      // not a $ command
      if (section[0] === "dir") {
        let newDirectory =
          (currentDirectory == "/"
            ? currentDirectory
            : currentDirectory + "/") + section[1];
        directories[newDirectory] = {
          parent: currentDirectory,
          files: [],
          directories: [],
        };

        directories[currentDirectory].directories.push(newDirectory);
      } else {
        directories[currentDirectory].files.push({
          file: section[1],
          fileSize: parseInt(section[0]),
        });
      }
    }
  }

  const recursiveSum = (directory) => {
    return (
      directories[directory].files.reduce(
        (acc, file) => acc + file.fileSize,
        0
      ) +
      directories[directory].directories.reduce(
        (acc, child) => acc + recursiveSum(child),
        0
      )
    );
  };

  let usedSpace = unusedSpace - (diskSpace - recursiveSum("/"));

  let allSizes = [];
  for (let i = 0; i < Object.keys(directories).length; i++) {
    let directory = Object.keys(directories)[i];
    allSizes.push(recursiveSum(directory));
  }

  return allSizes.reduce((lowest, size) => {
    if (size >= usedSpace) {
      if (size < lowest) {
        lowest = size;
      }
    }
    return lowest;
  });
};

tests([
  test(part1, _TESTinput, 95437),
  test(part1, _REALinput, 1778099),
  test(part2, _TESTinput, 24933642),
  test(part2, _REALinput, 1623571),
]);
