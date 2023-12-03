// Advent of code 2023 -- Filename : main.js
// Task link -- https://adventofcode.com/2023/day/3
// Github link -- https://github.com/teobot/advent-of-code/tree/main/2023/task%203
// Input link -- https://adventofcode.com/2023/day/3/input
// Run Using -- node './2023/task 3/main.js'
// Created by Theo Clapperton

const { inputToArray, test, tests } = require("../../common/common");

const _REALinput = inputToArray("../2023/task 3/input.txt", "\r\n");
const _TESTinput = inputToArray("../2023/task 3/test.txt", "\n");

const part1 = (input) => {
  // part 1

  // find all the indexes of all symbols
  const allSymbols = input
    .map((line, row) => {
      return line
        .split("")
        .map((char, column) => {
          return { char, column, row };
        })
        .filter((char) => char.char !== ".");
    })
    .filter((line) => line.length)
    .reduce((acc, line) => {
      return [...acc, ...line];
    }, [])
    .filter((char) => !parseInt(char.char));

  let nnnumbers = [];
  allSymbols.forEach((symbol) => {
    const { char, row, column } = symbol;

    // find the numbers around the symbol
    let numbers = [];
    for (let i = row - 1; i <= row + 1; i++) {
      for (let j = column - 1; j <= column + 1; j++) {
        if (i === row && j === column) continue;
        const char = input[i]?.[j];
        if (char)
          numbers.push({
            char,
            row: i,
            column: j,
          });
      }
    }

    numbers = numbers.filter((_char) => parseInt(_char.char));

    for (let i = 0; i < numbers.length; i++) {
      const _char = numbers[i];
      const nextNumbers = numbers.find((_numberElement) => {
        return (
          _numberElement.row === _char.row &&
          (_numberElement.column === _char.column + 1 ||
            _numberElement.column === _char.column - 1)
        );
      });

      if (nextNumbers) {
        numbers = numbers.filter((_numberElement) => {
          return nextNumbers !== _numberElement;
        });
      }
    }

    nnnumbers = [...nnnumbers, ...numbers];
  });

  // nnnumbers contains the row and column of a part of the numbers that are next to a symbol
  // need to go through each of the coords and find out what the number is that they are part of
  // then add all of those numbers together
  let total = 0;

  nnnumbers.forEach((number) => {
    const { row, column } = number;
    let wholeNumber = input[row][column];

    let columnNumber = column + 1;
    let no = wholeNumber;
    while (wholeNumber !== ".") {
      wholeNumber = input[row][columnNumber];
      if (wholeNumber === ".") break;

      columnNumber++;
      no += wholeNumber;
    }

    columnNumber = column - 1;

    wholeNumber = input[row][columnNumber];
    while (wholeNumber !== ".") {
      wholeNumber = input[row][columnNumber];
      if (wholeNumber === "." || wholeNumber === undefined) break;
      columnNumber--;
      no = wholeNumber + no;
    }

    total += parseInt(no);
  });

  return total;
};

const part2 = (input) => {
  // part 2

  return 0;
};

tests([
  test(part1, _TESTinput, 4361),
  //test(part1, _REALinput, 0),
  //test(part2, _TESTinput, 0)
  //test(part2, _REALinput, 0)
]);
