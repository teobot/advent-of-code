// Advent of code 2016 -- Filename : main.js
// Created by Theo Clapperton
// Started @ 2021-10-25 14:33:48
// Finished @ 2021-10-25 15:32:48
// Time Taken = 0 hours, 59 minutes and 0 seconds

const { inputToArray } = require("../../common/common");

const _REALinput = inputToArray("../2016/task 3/input.txt", "\n");

const _TESTinput = [
  "101  301  501",
  "102  302   502",
  "103  303  503",
  "201  401  601",
  "202   402  602",
  "203  403  603",
];

const part1 = (input) => {
  // part 1
  return input.filter((tri) => {
    const [a, b, c] = tri.trim().split("  ").map(Number);
    return a + b > c && a + c > b && b + c > a;
  }).length;
};

const part2 = (input) => {
  // part 2

  // find the two triangles that have the smallest sum
  let count = 0;

  // for each triangle replace all multiple spaces with a single space
  input = input.map((line) => {
    let string = line.trim().replace(/\s\s+/g, " ");
    return string;
  });

  // for each batch of 3 rows
  for (let i = 0; i < input.length; i += 3) {
    for (let ii = 0; ii < 3; ii++) {
      // for each triangle in the batch pick the a b c values
      let a = parseInt(input[i].split(" ")[ii]);
      let b = parseInt(input[i + 1].split(" ")[ii]);
      let c = parseInt(input[i + 2].split(" ")[ii]);

      // if the sum of the a b c values is less than or equal to the sum of the other two values
      if (a + b > c && a + c > b && b + c > a) {
        count++;
      }
    }
  }
  return count;
};

console.log({ task: 1, value: part1(_REALinput) });
console.log({ task: 2, value: part2(_REALinput) });
