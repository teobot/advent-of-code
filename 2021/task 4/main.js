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

const ifBingoRow = (row) => {
  return row.filter((rowNumber) => rowNumber !== "X").length === 0;
};

const ifBingoColumn = (board) => {
  for (let index = 0; index < board[0].length; index++) {
    let string = `${board[0][index]} ${board[1][index]} ${board[2][index]} ${board[3][index]} ${board[4][index]}`;
    if (string === "X X X X X") {
      return true;
    }
  }
  return false;
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
        if ((ifBingoRow(row) || ifBingoColumn(board)) && !fin) {
          fin = true;
          winningBoard = board;
          lastCalledNumber = number;
        }
      });
    });
  });

  return sumAllInArray(winningBoard) * lastCalledNumber;
};

const part2 = (input) => {
  // part 2
  const numbers = input.split("\n\n")[0].split(",").map(Number);

  let boards = getBoards(input).map((board) => {
    return { card: board, completed: false, no: 0, num: 0 };
  });

  let fin = false;
  let completedOrder = 0;

  numbers.forEach((number) => {
    boards.forEach((board) => {
      board.card.forEach((row) => {
        if(board.completed) return;
        row.forEach((rowNumber, i) => {
          if(board.completed) return;
          if (rowNumber === number && !fin) {
            // remove it from the row
            row.splice(row.indexOf(rowNumber), 1, "X");
          }
          // if row is gone then finished game
          if ((ifBingoRow(row) || ifBingoColumn(board.card)) && !fin) {
            board.completed = true;
            board.no = completedOrder;
            board.num = number;
            completedOrder++;
            return;
          }
        });
      });
    });
  });

  let losingBoard = null;
  let no = 0;
  boards.forEach((board) => {
    if (board.no > no) {
      no = board.no;
      losingBoard = board;
    }
  });

  return sumAllInArray(losingBoard.card) * losingBoard.num;
};

tests([
  { f: part1, input: _TESTinput, expected: 4512 },
  { f: part1, input: _REALinput, expected: 45031 },
  { f: part2, input: _TESTinput, expected: 1924 },
  { f: part2, input: _REALinput, expected: 2568 },
]);
