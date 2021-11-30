// Advent of code 2018 -- Filename : main.js
// Task link -- https://adventofcode.com/2018/day/9
// Github link -- https://github.com/teobot/advent-of-code/tree/main/2018/task%209
// Created by Theo Clapperton
// Started @ 2021-11-29 13:10:24

const { inputToArray, tests } = require("../../common/common");

const part1 = ({ players, lastMarble }) => {
  // part 1

  let scores = new Array(players).fill(0); // array of players scores
  let circle = [0]; // the circle array
  let current = 0; // the current marble index
  let currentPlayer = -1; // the current player index

  for (let i = 1; i <= lastMarble; i++) {
    // for each marble

    // move to the next player
    currentPlayer = (currentPlayer + 1) % players;

    if (i % 23 === 0) {
      // if the marble is a "special" marble
      scores[currentPlayer] += i; // add the marble value to the player score
      current -= 7; // move the current index back 7

      if (current < 0) {
        // if the current index is negative
        current += circle.length;
        // move the current index to the end of the circle
      }

      scores[currentPlayer] += circle[current]; // add the marble value to the player score
      circle.splice(current, 1); // remove the marble from the circle
    } else {
      // if the marble is not a "special" marble
      current += 2; // move the current index forward 2
      if (current >= circle.length) {
        // if the current index is at the end of the circle
        current -= circle.length; // move the current index back to the start of the circle
      }
      circle.splice(current, 0, i); // add the marble to the circle
    }
  }

  return Math.max(...scores); // return the highest score
};

const part2 = (input) => {
  // part 2
  return part1({ ...input, lastMarble: input.lastMarble * 100 });
};

tests([
  { f: part1, input: { players: 10, lastMarble: 1618 }, expected: 8317 },
  { f: part1, input: { players: 13, lastMarble: 7999 }, expected: 146373 },
  { f: part1, input: { players: 17, lastMarble: 1104 }, expected: 2764 },
  { f: part1, input: { players: 21, lastMarble: 6111 }, expected: 54718 },
  { f: part1, input: { players: 30, lastMarble: 5807 }, expected: 37305 },
  { f: part1, input: { players: 458, lastMarble: 71307 }, expected: 398048 },
  { f: part2, input: { players: 458, lastMarble: 71307 }, expected: 0 },
]);
