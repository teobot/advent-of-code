// Advent of code 2017 -- Filename : main.js
// Created by Theo Clapperton
// Started @ 2021-10-05 18:39:06
// Finished @ 2021-10-05 19:49:20
const { inputToIntArray } = require("../../common/common");

const _input = inputToIntArray("../2017/task 1/input.txt", "");

// PART 1 TESTS
// const test1 = [1, 1, 2, 2];
// const test2 = [1, 1, 1, 1];
// const test3 = [1, 2, 3, 4];
// const test4 = [9, 1, 2, 1, 2, 1, 2, 9];

// PART 2 TESTS
// const test1 = [1, 2, 1, 2];
// const test2 = [1, 2, 2, 1];
// const test3 = [1, 2, 3, 4, 2, 5];
// const test4 = [1, 2, 3, 1, 2, 3];
// const test5 = [1, 2, 1, 3, 1, 4, 1, 5];

const part1 = (input) => {
  // part 1
  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === input[i === input.length - 1 ? 0 : i + 1]) {
      sum += input[i];
    }
  }
  return sum;
};

const part2 = (input) => {
  // part 2
  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    if (i + input.length / 2 >= input.length) {
      let haveToMove = input.length / 2;
      let distanceToEnd = input.length - i;

      let leftToMove = haveToMove - distanceToEnd;

      if (input[i] === input[leftToMove]) {
        sum += input[i];
      }
    } else {
      if (input[i] === input[i + input.length / 2]) {
        sum += input[i];
      }
    }
  }
  return sum;
};

// console.log({ test: 1, value: part1(test1), passed: part1(test1) === 3 });
// console.log({ test: 2, value: part1(test2), passed: part1(test2) === 4 });
// console.log({ test: 3, value: part1(test3), passed: part1(test3) === 0 });
// console.log({ test: 4, value: part1(test4), passed: part1(test4) === 9 });

// console.log({ test: 1, value: part2(test1), passed: part2(test1) === 6 });
// console.log({ test: 2, value: part2(test2), passed: part2(test2) === 0 });
// console.log({ test: 3, value: part2(test3), passed: part2(test3) === 4 });
// console.log({ test: 4, value: part2(test4), passed: part2(test4) === 12 });
// console.log({ test: 5, value: part2(test5), passed: part2(test5) === 4 });

console.log({ task: 1, value: part1(_input) });
console.log({ task: 2, value: part2(_input) });
