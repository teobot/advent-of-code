// Advent of code 2021 -- Filename : main.js
// Task link -- https://adventofcode.com/2021/day/24
// Github link -- https://github.com/teobot/advent-of-code/tree/main/2021/task%2024
// Created by Theo Clapperton

const { inputToArray, tests } = require("../../common/common");

const _REALinput = inputToArray("../2021/task 24/input.txt", "\n");

function isNumeric(str) {
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}

function percentage(partialValue, totalValue) {
  return Math.round((100 * partialValue) / totalValue);
}

const part1 = (inp) => {
  // part 1

  let highest = 0;

  const data = inp.map((line) => {
    let [action, val1, val2] = line.split(" ");
    return {
      action,
      val1,
      val2: isNumeric(val2) ? parseInt(val2) : val2,
      val2Numeric: isNumeric(val2),
    };
  });

  for (let val = 99999999999999; val > 11111111111111; val--) {
    if (`${val}`.includes("0")) continue;

    let number = `${val}`.split("").map(Number);
    let values = { w: 0, x: 0, y: 0, z: 0 };

    data.forEach((instruction) => {
      switch (instruction.action) {
        case "inp":
          values[instruction.val1] = number.shift();
          break;
        case "add":
          values[instruction.val1] =
            values[instruction.val1] + instruction.val2Numeric
              ? instruction.val2
              : values[instruction.val2];
          break;
        case "mul":
          values[instruction.val1] =
            values[instruction.val1] * instruction.val2Numeric
              ? instruction.val2
              : values[instruction.val2];
          break;
        case "div":
          Math.floor(
            (values[instruction.val1] /= instruction.val2Numeric
              ? instruction.val2
              : values[instruction.val2])
          );
          break;
        case "mod":
          values[instruction.val1] %= instruction.val2Numeric
            ? instruction.val2
            : parseInt(values[instruction.val2]);
          break;
        case "eql":
          if (instruction.val2Numeric) {
            // if the value is numeric, we compare the value to the value
            if (values[instruction.val1] === instruction.val2) {
              values[instruction.val1] = 1;
            } else {
              values[instruction.val1] = 0;
            }
          } else {
            // if the value is not numeric, we compare the value to the value
            if (values[instruction.val1] === values[instruction.val2]) {
              values[instruction.val1] = 1;
            } else {
              values[instruction.val1] = 0;
            }
          }
          break;
        default:
          break;
      }
    });

    if (values.z === 0) {
      console.log({ highest, values });
      return highest;
    }
  }

  return highest;
};

const part2 = (input) => {
  // part 2

  return 0;
};

tests([
  { f: part1, input: _REALinput, expected: 0 },
  //{ f: part1, input: _REALinput, expected: 0 },
  //{ f: part2, input: _TESTinput, expected: 0 },
  //{ f: part2, input: _REALinput, expected: 0 },
]);
