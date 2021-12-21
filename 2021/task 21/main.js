// Advent of code 2021 -- Filename : main.js
// Task link -- https://adventofcode.com/2021/day/21
// Github link -- https://github.com/teobot/advent-of-code/tree/main/2021/task%2021
// Created by Theo Clapperton

const { inputToArray, tests } = require("../../common/common");

const _REALinput = { player1Position: 7, player2Position: 6 };
const _TESTinput = { player1Position: 4, player2Position: 8 };

const part1 = (input) => {
  // part 1
  let scores = { player1Score: 0, player2Score: 0 };

  let positions = {
    player1Position: input.player1Position,
    player2Position: input.player2Position,
  };

  let diceNo = 1;
  let player1Active = true;
  let gameRunning = true;
  let diceRolls = 0;

  while (gameRunning) {
    let diceSum = 0;

    for (let i = 0; i < 3; i++) {
      if (diceNo > 100) {
        diceNo = 1;
      }
      diceSum += diceNo;
      diceNo++;
    }

    diceRolls += 3;

    if (player1Active) {
      // player 1 turn
      for (let i = 0; i < diceSum; i++) {
        positions.player1Position++;
        if (positions.player1Position > 10) {
          positions.player1Position = 1;
        }
      }
      scores.player1Score += positions.player1Position;

      player1Active = false;
    } else {
      // player 2 turn
      for (let i = 0; i < diceSum; i++) {
        positions.player2Position++;
        if (positions.player2Position > 10) {
          positions.player2Position = 1;
        }
      }
      scores.player2Score += positions.player2Position;

      player1Active = true;
    }

    if (scores.player1Score >= 1000 || scores.player2Score >= 1000) {
      gameRunning = false;
    }
  }

  return (
    (player1Active ? scores.player1Score : scores.player2Score) * diceRolls
  );
};

const part2 = (input) => {
  // part 2

  return 0;
};

tests([
  { f: part1, input: _TESTinput, expected: 739785 },
  { f: part1, input: _REALinput, expected: 671580 },
  { f: part2, input: _TESTinput, expected: 444356092776315 },
  //{ f: part2, input: _REALinput, expected: 0 },
]);
