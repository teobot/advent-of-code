// Advent of code 2021 -- Filename : main.js
// Task link -- https://adventofcode.com/2021/day/4
// Github link -- https://github.com/teobot/advent-of-code/tree/main/2021/task%204
// Created by Theo Clapperton

const { returnInput, tests } = require("../../common/common");

const _REALinput = returnInput("../2021/task 4/input.txt");
const _TESTinput = returnInput("../2021/task 4/in2.txt");

const sumAllInArray = (board) => {
  let sum = 0;
  for (let x = 0; x < board.length; x++) {
    const row = board[x];
    for (let y = 0; y < row.length; y++) {
      if (row[y] !== "X") {
        sum += parseInt(row[y]);
      }
    }
  }
  return sum;
};

const getBoards = (input) => {
  let inp = input.split("\n\n");
  inp.shift();
  let boards = inp
    .map((board) => board.split("\n"))
    .map((board) => board.map((row) => row.trim().replace(/  /g, " ")))
    .map((board) => board.map((row) => row.split(" ")))
    .map((board) => board.map((row) => row.map(Number)));
  return boards;
};

const part1 = (input) => {
  // part 1
  const numbers = input.split("\n\n")[0].split(",").map(Number);

  let boards = getBoards(input);

  let winningBoard = null;
  let lastCalledNumber = null;
  let fin = false;

  numbers.forEach((number) => {
    boards.forEach((board) => {
      board.forEach((row) => {
        row.forEach((rowNumber, i) => {
          if (rowNumber === number && !fin) {
            // remove it from the row
            row.splice(row.indexOf(rowNumber), 1, "X");
          }
        });

        // if row is gone then finished game
        if (row.filter((rowNumber) => rowNumber !== "X").length === 0 && !fin) {
          fin = true;
          winningBoard = board;
          lastCalledNumber = number;
        }
      });

      if (!fin) {
        for (let index = 0; index < board[0].length; index++) {
          let string =
            board[0][index] +
            " " +
            board[1][index] +
            " " +
            board[2][index] +
            " " +
            board[3][index] +
            " " +
            board[4][index];
          if (string === "X X X X X") {
            fin = true;
            winningBoard = board;
            lastCalledNumber = number;
          }
        }
      }
    });
  });

  let sum = sumAllInArray(winningBoard);

  return sum * lastCalledNumber;
};

const part2 = (input) => {
  // part 2
  const numbers = input.split("\n\n")[0].split(",").map(Number);

  let boards = getBoards(input);

  let fin = false;
  let lastBoard = null;
  let lastCalledNumber = null;
  let isLastBoard = false;
  let hasLastBoardWon = false;
  let result = 0;
  let runOneLastTime = false;

  for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i];
    for (let j = 0; j < boards.length; j++) {
      const board = boards[j];
      for (let k = 0; k < board.length; k++) {
        const row = board[k];
        for (let l = 0; l < row.length; l++) {
          const rowNumber = row[l];
          if (rowNumber === number) {
            // remove it from the row
            row.splice(row.indexOf(rowNumber), 1, "X");

            if (row.filter((rowNumber) => rowNumber !== "X").length === 0) {
              // remove the board from the boards array
              if (isLastBoard) {
                // if the last board has been removed then we can stop
                console.log('====================================');
                console.log(boards[0]);
                console.log(number);
                console.log('====================================');
                return 0
              } else {
                boards.splice(boards.indexOf(board), 1);
              }
            }

            for (let index = 0; index < board[0].length; index++) {
              let string = `${board[0][index]} ${board[1][index]} ${board[2][index]} ${board[3][index]} ${board[4][index]}`;
              if (string === "X X X X X") {
                if (isLastBoard) {
                  // if it is not the last board
                } else {
                  boards.splice(boards.indexOf(board), 1);
                }
              }
            }
          }
        }
      }

      if (boards.length === 1) {
        // if the last board is gone
        isLastBoard = true;
      }
    }
  }
};

tests([
  { f: part1, input: _TESTinput, expected: 4512 },
  { f: part1, input: _REALinput, expected: 45031 },
  //{ f: part2, input: _REALinput, expected: 2568 },
  { f: part2, input: _TESTinput, expected: 1924 },
]);
