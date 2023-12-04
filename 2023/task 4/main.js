// Advent of code 2023 -- Filename : main.js
// Task link -- https://adventofcode.com/2023/day/4
// Github link -- https://github.com/teobot/advent-of-code/tree/main/2023/task%204
// Input link -- https://adventofcode.com/2023/day/4/input
// Run Using -- node './2023/task 4/main.js'
// Created by Theo Clapperton

const { inputToArray, test, tests } = require("../../common/common");

const _REALinput = inputToArray("../2023/task 4/input.txt", "\n");
const _TESTinput = inputToArray("../2023/task 4/test.txt", "\r\n");

const part1 = (input) => {
  // part 1
  input = input.map((game) => {
    const [winningNumbers, numbers] = game.split(" | ");
    return {
      winningNumbers: winningNumbers.split(": ")[1].match(/\d+/g).map(Number),
      numbers: numbers.match(/\d+/g).map(Number),
    };
  });

  input.forEach((game) => {
    const { winningNumbers, numbers } = game;
    let score = 0;
    numbers.forEach((number) => {
      if (winningNumbers.includes(number)) {
        if (score === 0) {
          score = 1;
        } else {
          score *= 2;
        }
      }
    });
    game.score = score;
  });

  return input.reduce((acc, game) => acc + game.score, 0);
};

const part2 = (input) => {
  // part 2
  input = input.map((game) => {
    const [winningNumbers, numbers] = game.split(" | ");
    return {
      cardId: parseInt(
        winningNumbers.split(": ")[0].replaceAll(" ", "").split("Card")[1]
      ),
      winningNumbers: winningNumbers.split(": ")[1].match(/\d+/g).map(Number),
      numbers: numbers.match(/\d+/g).map(Number),
    };
  });

  input.forEach((game) => {
    const { winningNumbers, numbers } = game;
    let score = 0;
    numbers.forEach((number) => {
      if (winningNumbers.includes(number)) {
        if (score === 0) {
          score = 1;
        } else {
          score *= 2;
        }
      }
    });
    game.score = score;
  });

  input.forEach((game) => {
    const { winningNumbers, numbers } = game;
    let numberOfWins = 1;
    winningNumbers.forEach((number, index) => {
      if (numbers.includes(number)) {
        game.cards = game.cards
          ? game.cards.concat([game.cardId + numberOfWins])
          : [game.cardId + numberOfWins];
        numberOfWins++;
      }
    });
  });

  let newArray = [...input];
  let counts = {};

  // timer
  let start = new Date();

  while (newArray.length > 0) {
    const card = newArray.shift();

    if (!card) break;

    counts[card.cardId] = counts[card.cardId] ? counts[card.cardId] + 1 : 1;
    if (card.cards) {
      card.cards.forEach((CCCard) => {
        const GGGame = input.find((findGame) => findGame.cardId === CCCard);
        if (GGGame) {
          newArray.push(GGGame);
        }
      });
    }

    // console.log the time
    if (new Date() - start > 1000) {
      console.count("Still going...");
      start = new Date();
    }
  }

  // sum the values
  return Object.values(counts).reduce((acc, val) => acc + val, 0);
};

tests([
  test(part1, _TESTinput, 13),
  test(part1, _REALinput, 21213),
  test(part2, _TESTinput, 30),
  //test(part2, _REALinput, 0),
]);
