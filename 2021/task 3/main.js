// Advent of code 2021 -- Filename : main.js
// Task link -- https://adventofcode.com/2021/day/3
// Github link -- https://github.com/teobot/advent-of-code/tree/main/2021/task%203
// Created by Theo Clapperton

const { inputToArray, tests } = require("../../common/common");

const _REALinput = inputToArray("../2021/task 3/input.txt", "\n");

const part1 = (input) => {
  // part 1
  let gamma = "";
  let epsilon = "";
  for (let i = 0; i < input[0].split("").length; i++) {
    let zeroCount = 0;
    let oneCount = 0;
    for (let x = 0; x < input.length; x++) {
      input[x][i] === "0" ? (zeroCount += 1) : (oneCount += 1);
    }
    if (oneCount < zeroCount) {
      gamma += "0";
      epsilon += "1";
    } else {
      gamma += "1";
      epsilon += "0";
    }
  }
  return parseInt(epsilon, 2) * parseInt(gamma, 2);
};

const part2 = (input) => {
  // part 2
  let oxygen = findLastMolecule([...input], "1");
  let c02 = findLastMolecule([...input], "0");
  return parseInt(oxygen, 2) * parseInt(c02, 2);
};

const findLastMolecule = (input, molly) => {
  let mol = ""
  for (let i = 0; i < input[0].split("").length; i++) {
    let zeroCount = 0;
    let oneCount = 0;
    for (let x = 0; x < input.length; x++) {
      input[x][i] === "0" ? (zeroCount += 1) : (oneCount += 1);
    }
    if (oneCount === zeroCount || oneCount > zeroCount) {
      // more ones then zeros or equal
      input = input.filter((x) => x[i] === molly);
    } else {
        // more 0s than 1s
        input = input.filter((x) => x[i] === (molly === "0" ? "1" : "0"));
    }
    if (input.length === 1) {
      // we found the only one left
      mol = input[0];
      break;
    }
  }
  return mol
}

tests([
  {
    f: part1,
    input: [
      "00100",
      "11110",
      "10110",
      "10111",
      "10101",
      "01111",
      "00111",
      "11100",
      "10000",
      "11001",
      "00010",
      "01010",
    ],
    expected: 198,
  },
  { f: part1, input: _REALinput, expected: 3969000 },
  {
    f: part2,
    input: [
      "00100",
      "11110",
      "10110",
      "10111",
      "10101",
      "01111",
      "00111",
      "11100",
      "10000",
      "11001",
      "00010",
      "01010",
    ],
    expected: 230,
  },
  { f: part2, input: _REALinput, expected: 4267809 },
]);
