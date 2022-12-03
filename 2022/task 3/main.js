// Advent of code 2022 -- Filename : main.js
// Task link -- https://adventofcode.com/2022/day/3
// Github link -- https://github.com/teobot/advent-of-code/tree/main/2022/task%203
// Run Using -- node './2022/task 3/main.js'
// Created by Theo Clapperton

const { inputToArray, test, tests } = require("../../common/common");

const _REALinput = inputToArray("../2022/task 3/input.txt", "\n");
const _TESTinput = inputToArray("../2022/task 3/test.txt", "\r\n");

const part1 = (input) => {
  // part 1
  let tt = 0;
  input.forEach((rucksack) => {
    // split the rucksack into two parts of equal length

    let compartment1 = rucksack.slice(0, rucksack.length / 2);
    let compartment2 = rucksack.slice(rucksack.length / 2, rucksack.length);

    // find all the characters that are the same between the two compartments
    let same = [];
    compartment1.split("").forEach((char, index) => {
      if (compartment2.split("").includes(char)) {
        if (!same.includes(char)) {
          same.push(char);
        }
      }
    });

    same.forEach((char) => {
      // get the character value with a = 1 and z = 26
      tt += calculateCharScore(char);
    });
  });

  return tt;
};

const part2 = (input) => {
  // part 2
  let tt = 0;

  for (let i = 0; i < input.length; i += 3) {
    const efl1Rucksack = input[i].split("");
    const efl2Rucksack = input[i + 1].split("");
    const efl3Rucksack = input[i + 2].split("");

    let same = [];
    efl1Rucksack.forEach((char) => {
      if (efl2Rucksack.includes(char) && efl3Rucksack.includes(char)) {
        if (!same.includes(char)) {
          same.push(char);
        }
      }
    });

    tt += calculateCharScore(same[0]);
  }
  return tt;
};

const calculateCharScore = (char) => {
  let charValue = char.charCodeAt(0);
  if (charValue >= 97 && charValue <= 122) {
    charValue -= 96;
  } else if (charValue >= 65 && charValue <= 90) {
    charValue -= 38;
  }
  return charValue;
};

tests([
  test(part1, _TESTinput, 157),
  test(part1, _REALinput, 7817),
  test(part2, _TESTinput, 70),
  test(part2, _REALinput, 2444),
]);
