// Advent of code 2021 -- Filename : main.js
// Task link -- https://adventofcode.com/2021/day/14
// Github link -- https://github.com/teobot/advent-of-code/tree/main/2021/task%2014
// Created by Theo Clapperton

const { inputToArray, tests } = require("../../common/common");

const _REALinput = inputToArray("../2021/task 14/input.txt", "\n");
const _TESTinput = inputToArray("../2021/task 14/test.txt", "\n");

const part1 = (input) => {
  // part 1
  let template = input[0];

  let rules = input.splice(2, input.length).map((rule) => {
    return {
      convert: rule.split(" -> ")[0],
      to: rule.split(" -> ")[1],
    };
  });

  let stepCount = 10;

  for (let step = 0; step < stepCount; step++) {
    let newTemplate = "";
    for (let i = 0; i < template.length - 1; i++) {
      let templateStr = template[i] + template[i + 1];
      rules.forEach((rule) => {
        if (rule.convert === templateStr) {
          newTemplate += `${template[i]}${rule.to}`;
        }
      });
    }
    newTemplate += template[template.length - 1];
    template = newTemplate;
  }

  let counts = {};
  template.split("").forEach((char) => {
    counts[char] = (counts[char] || 0) + 1;
  });

  // find the most common char
  let mostCommon = "";
  let mostCommonCount = 0;
  let leastCommon = "";
  let leastCommonCount = 0;
  for (let char in counts) {
    if (counts[char] > mostCommonCount) {
      mostCommon = char;
      mostCommonCount = counts[char];
    }
    if (counts[char] < leastCommonCount || leastCommonCount === 0) {
      leastCommon = char;
      leastCommonCount = counts[char];
    }
  }

  return mostCommonCount - leastCommonCount;
};

const part2 = (input) => {
  // part 2
  let template = input[0];

  let rules = input.splice(2, input.length).map((rule) => {
    return {
      convert: rule.split(" -> ")[0],
      to: rule.split(" -> ")[1],
    };
  });

  let stepCount = 40;

  for (let step = 0; step < stepCount; step++) {
    let newTemplate = "";
    for (let i = 0; i < template.length - 1; i++) {
      let templateStr = template[i] + template[i + 1];
      rules.forEach((rule) => {
        if (rule.convert === templateStr) {
          newTemplate += `${template[i]}${rule.to}`;
        }
      });
    }
    newTemplate += template[template.length - 1];
    template = newTemplate;
  }

  let counts = {};
  template.split("").forEach((char) => {
    counts[char] = (counts[char] || 0) + 1;
  });

  // find the most common char
  let mostCommon = "";
  let mostCommonCount = 0;
  let leastCommon = "";
  let leastCommonCount = 0;
  for (let char in counts) {
    if (counts[char] > mostCommonCount) {
      mostCommon = char;
      mostCommonCount = counts[char];
    }
    if (counts[char] < leastCommonCount || leastCommonCount === 0) {
      leastCommon = char;
      leastCommonCount = counts[char];
    }
  }

  return mostCommonCount - leastCommonCount;
};

tests([
  //{ f: part1, input: _TESTinput, expected: 1588 },
  //{ f: part1, input: _REALinput, expected: 3342 },
  //{ f: part2, input: _TESTinput, expected: 2188189693529 },
  { f: part2, input: _REALinput, expected: 0 },
]);
