// Advent of code 2023 -- Filename : main.js
// Task link -- https://adventofcode.com/2023/day/2
// Github link -- https://github.com/teobot/advent-of-code/tree/main/2023/task%202
// Input link -- https://adventofcode.com/2023/day/2/input
// Run Using -- node './2023/task 2/main.js'
// Created by Theo Clapperton

const { inputToArray, test, tests } = require("../../common/common");

const _REALinput = inputToArray("../2023/task 2/input.txt", "\n");
const _TESTinput = inputToArray("../2023/task 2/test.txt", "\r\n");

const part1 = (input) => {
  // part 1
  const rule = {
    red: 12,
    green: 13,
    blue: 14,
  };

  let tally = 0;

  input = input.map((GAME_LINE) => {
    let [id, game] = GAME_LINE.split(": ");

    let doesGameWork = true;

    game.split("; ").map((subGame) => {
      let _game = { id: id };
      subGame.split(", ").map((_ga) => {
        const [value, color] = _ga.split(" ");
        if (_game[color]) {
          _game[color] = _game[color] += parseInt(value);
        } else {
          _game[color] = parseInt(value);
        }
      });

      if (
        _game.red > rule.red ||
        _game.green > rule.green ||
        _game.blue > rule.blue
      ) {
        doesGameWork = false;
      }
    });

    if (doesGameWork) {
      tally += parseInt(id.split(" ")[1]);
    }
  });

  return tally;
};

const part2 = (input) => {
  // part 2
  input = input.map((GAME_LINE) => {
    let [id, game] = GAME_LINE.split(": ");

    let _game = {};
    game.split("; ").map((subGame) => {
      subGame.split(", ").map((_ga) => {
        const [value, color] = _ga.split(" ");
        if (_game[color]) {
          if (_game[color] < parseInt(value)) {
            _game[color] = parseInt(value);
          }
        } else {
          _game[color] = parseInt(value);
        }
      });
    });
    // foreach key in _game add up the values of those keys
    let total = 1;
    Object.keys(_game).map((key) => {
      total *= _game[key];
    });
    return total;
  });

  return input.reduce((a, b) => a + b, 0);
};

tests([
  test(part1, _TESTinput, 8),
  test(part1, _REALinput, 2164),
  test(part2, _TESTinput, 2286),
  test(part2, _REALinput, 69929),
]);
