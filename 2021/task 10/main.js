// Advent of code 2021 -- Filename : main.js
// Task link -- https://adventofcode.com/2021/day/10
// Github link -- https://github.com/teobot/advent-of-code/tree/main/2021/task%2010
// Created by Theo Clapperton

const { inputToArray, tests } = require("../../common/common");

const _REALinput = inputToArray("../2021/task 10/input.txt", "\n");
const _TESTinput = inputToArray("../2021/task 10/test.txt", "\n");

const getCharacterScorePART2 = (char) => {
  switch (char) {
    case ")":
      return 1;
    case "]":
      return 2;
    case "}":
      return 3;
    case ">":
      return 4;
    default:
      return 0;
  }
};

const getCharacterScorePART1 = (char) => {
    switch (char) {
      case ")":
        return 3;
      case "]":
        return 57;
      case "}":
        return 1197;
      case ">":
        return 25137;
      default:
        return 0;
    }
  };

const reverseString = (str) => {
  let rstr = "";
  for (i = str.split("").length; i > -1; i--) {
    const char = str.split("")[i];
    switch (char) {
      case "(":
        rstr += ")";
        break;
      case "[":
        rstr += "]";
        break;
      case "{":
        rstr += "}";
        break;
      case "<":
        rstr += ">";
        break;
    }
  }
  return rstr;
};

const part1 = (input) => {
  // part 1
  let chunks = [...input];

  chunks.forEach((chunk, chunkIndex) => {
    let hasChanged = true;

    while (hasChanged) {
      const prev = `${chunks[chunkIndex]}`;
      chunks[chunkIndex] = chunks[chunkIndex].replace(/[(]\)/g, "");
      chunks[chunkIndex] = chunks[chunkIndex].replace(/[[]\]/g, "");
      chunks[chunkIndex] = chunks[chunkIndex].replace(/[{]\}/g, "");
      chunks[chunkIndex] = chunks[chunkIndex].replace(/<>/g, "");
      if (chunks[chunkIndex].length === prev.length) hasChanged = false;
    }
  });

  let sum = 0;

  chunkLoop: for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    for (let x = 0; x < chunk.split("").length; x++) {
      const char = chunk.split("")[x];
      if (getCharacterScorePART1(char) > 0) {
        sum += getCharacterScorePART1(char);
        continue chunkLoop;
      }
    }
  }

  return sum;
};

const part2 = (input) => {
  // part 2

  let chunks = [...input];

  chunks.forEach((chunk, chunkIndex) => {
    let hasChanged = true;
    while (hasChanged) {
      const prev = `${chunks[chunkIndex]}`;
      chunks[chunkIndex] = chunks[chunkIndex].replace(/[(]\)/g, "");
      chunks[chunkIndex] = chunks[chunkIndex].replace(/[[]\]/g, "");
      chunks[chunkIndex] = chunks[chunkIndex].replace(/[{]\}/g, "");
      chunks[chunkIndex] = chunks[chunkIndex].replace(/<>/g, "");
      if (chunks[chunkIndex].length === prev.length) hasChanged = false;
    }
  });

  chunks = chunks
    .filter((chunk) => {
      for (let x = 0; x < chunk.split("").length; x++) {
        const char = chunk.split("")[x];
        if ([")", "]", "}", ">"].includes(char)) {
          return false;
        }
      }
      return true;
    })
    .map(reverseString);

  let sumArray = [];

  for (let i = 0; i < chunks.length; i++) {

    const chunk = chunks[i];
    let chunkSum = 0;

    for (let x = 0; x < chunk.split("").length; x++) {
      const char = chunk.split("")[x];
      chunkSum = chunkSum * 5;
      chunkSum += getCharacterScorePART2(char);
    }

    sumArray.push(chunkSum);
  }

  sumArray.sort((a, b) => b - a);

  return sumArray[Math.round((sumArray.length - 1) / 2)];
};

tests([
  { f: part1, input: _TESTinput, expected: 26397 },
  { f: part1, input: _REALinput, expected: 299793 },
  { f: part2, input: _TESTinput, expected: 288957 },
  { f: part2, input: _REALinput, expected: 3654963618 },
]);
