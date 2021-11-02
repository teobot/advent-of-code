// Advent of code 2018 -- Filename : main.js
// Created by Theo Clapperton
// Started @ 2021-11-01 11:12:50
// Finished @ 2021-11-01 12:26:11
// Time Taken = 1 hour, 13 minutes and 21 seconds

const { inputToString } = require("../../common/common");

const _REALinput = inputToString("../2018/task 5/input.txt");

const part1 = (input) => {
  // part 1
  let _values = input.split("");
  let changed = true;
  while (changed) {
    changed = false;
    for (let i = 0; i < _values.length; i++) {
      let _val1 = _values[i];
      let _val2 = i === _values.length - 1 ? _values[0] : _values[i + 1];

      if (_val1.toUpperCase() === _val1) {
        // val1 is uppercase
        if (_val2.toUpperCase() !== _val2) {
          // val2 is lowercase
          if (_val1.toLowerCase() === _val2.toLowerCase()) {
            _values.splice(i, 2);
            changed = true;
          }
        }
      } else {
        // val1 is lowercase
        if (
          _val2.toUpperCase() === _val2 &&
          _val1.toLowerCase() === _val2.toLowerCase()
        ) {
          // val2 is uppercase
          _values.splice(i, 2);
          changed = true;
        }
      }
    }
  }
  return _values.length + 1;
};

const part2 = (input) => {
  // part 2
  let _values = input.split("");
  let lowest = 0;

  let sorted = _values.filter(function (item, pos, self) {
    return self.indexOf(item.toLowerCase()) == pos;
  });

  for (let i = 0; i < sorted.length; i++) {
    let char = sorted[i];

    let score = part1(
      input
        .replaceAll(char.toUpperCase(), "")
        .replaceAll(char.toLowerCase(), "")
    );

    if (score < lowest || lowest === 0) {
      lowest = score;
    }
  }

  return lowest;
};

console.log({ task: 1, value: part1(_REALinput) });
console.log({ task: 2, value: part2(_REALinput) });
