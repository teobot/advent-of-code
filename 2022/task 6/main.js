// Advent of code 2022 -- Filename : main.js
// Task link -- https://adventofcode.com/2022/day/6
// Github link -- https://github.com/teobot/advent-of-code/tree/main/2022/task%206
// Input link -- https://adventofcode.com/2022/day/6/input
// Run Using -- node './2022/task 6/main.js'
// Created by Theo Clapperton

const {
  inputToString,
  test,
  tests,
  toFindDuplicates,
} = require("../../common/common");

const _REALinput = inputToString("../2022/task 6/input.txt");

const solution = (input, length) => {
  let array = input.split("");
  let last4Characters = [];
  let uniques = [];
  for (let i = 0; i < array.length; i++) {
    let item = array[i];

    if (last4Characters.length < length) {
      last4Characters.push(item);
    } else {
      last4Characters.shift();
      last4Characters.push(item);
    }

    if (!uniques.includes(item)) {
      uniques.push(item);
    }

    // if there are more than length uniques then we can stop
    if (uniques.length >= length) {
      if (!toFindDuplicates(last4Characters).length) {
        return i + 1;
      }
    }
  }
};

const part1 = (input) => {
  // part 1
  return solution(input, 4);
};

const part2 = (input) => {
  // part 2
  return solution(input, 14);
};

tests([
  test(part1, "bvwbjplbgvbhsrlpgdmjqwftvncz", 5),
  test(part1, "nppdvjthqldpwncqszvftbrmjlhg", 6),
  test(part1, "mjqjpqmgbljsphdztnvjfqwrcgsmlb", 7),
  test(part1, "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", 10),
  test(part1, "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 11),
  test(part1, _REALinput, 1912),
  test(part2, "mjqjpqmgbljsphdztnvjfqwrcgsmlb", 19),
  test(part2, "bvwbjplbgvbhsrlpgdmjqwftvncz", 23),
  test(part2, "nppdvjthqldpwncqszvftbrmjlhg", 23),
  test(part2, "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", 29),
  test(part2, "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 26),
  test(part2, _REALinput, 2122),
]);
