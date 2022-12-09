// Advent of code 2022 -- Filename : main.js
// Task link -- https://adventofcode.com/2022/day/9
// Github link -- https://github.com/teobot/advent-of-code/tree/main/2022/task%209
// Input link -- https://adventofcode.com/2022/day/9/input
// Run Using -- node './2022/task 9/main.js'
// Created by Theo Clapperton

const { inputToArray, test, tests } = require("../../common/common");

const _REALinput = inputToArray("../2022/task 9/input.txt", "\n");
const _TESTinput = inputToArray("../2022/task 9/test.txt", "\r\n");
const _TESTinput2 = inputToArray("../2022/task 9/test2.txt", "\r\n");

const part1 = (input) => {
  // part 2
  return solution(input, 2); // a head and a tail
};

const part2 = (input) => {
  // part 2
  return solution(input, 10); // a head and 8 knots and a tail
};

const solution = (input, numberOfKnots) => {
  let knots = {};
  let locations = [];

  for (let i = 0; i < numberOfKnots + 1; i++) {
    knots[i] = { x: 0, y: 0 };
  }

  input.forEach((movement) => {
    const [direction, distance] = movement.split(" ");
    for (let i = 0; i < parseInt(distance); i++) {
      switch (direction) {
        case "U":
          knots[0].y++;
          break;
        case "D":
          knots[0].y--;
          break;
        case "L":
          knots[0].x--;
          break;
        case "R":
          knots[0].x++;
          break;
      }

      for (let i = 0; i < numberOfKnots; i++) {
        let km = calculateKnotMovement(knots[i], knots[i + 1]);
        knots[i] = km.head;
        knots[i + 1] = km.tail;
      }

      let coord = `${knots[numberOfKnots - 1].x},${knots[numberOfKnots - 1].y}`;
      if (!locations.includes(coord)) {
        locations.push(coord);
      }
    }
  });

  return locations.length;
};

const calculateKnotMovement = (_h, _t) => {
  let head = { ..._h };
  let tail = { ..._t };
  if (head.x === tail.x && head.y === tail.y) {
  } else if (head.x === tail.x && head.y !== tail.y) {
    // is there gap between head and tail
    if (head.y > tail.y + 1) {
      tail.y++;
    } else if (head.y < tail.y - 1) {
      tail.y--;
    }
  } else if (head.y === tail.y && head.x !== tail.x) {
    // is there gap between head and tail
    if (head.x > tail.x + 1) {
      tail.x++;
    } else if (head.x < tail.x - 1) {
      tail.x--;
    }
  } else if (head.x !== tail.x && head.y !== tail.y) {
    // the head and tail are not on the same axis
    // move the tail to the head if there is a gap between them
    if (
      (head.x === tail.x + 1 && head.y === tail.y + 1) ||
      (head.x === tail.x - 1 && head.y === tail.y - 1) ||
      (head.x === tail.x + 1 && head.y === tail.y - 1) ||
      (head.x === tail.x - 1 && head.y === tail.y + 1)
    ) {
      // the head and tail are diagonal to each other
      // do nothing
    } else {
      // the head and tail are not diagonal to each other
      // move the tail to the head, minus the direction of travel
      if (head.x > tail.x) {
        tail.x++;
      } else if (head.x < tail.x) {
        tail.x--;
      }
      if (head.y > tail.y) {
        tail.y++;
      } else if (head.y < tail.y) {
        tail.y--;
      }
    }
  }
  return { head, tail };
};

tests([
  test(part1, _TESTinput, 13),
  test(part1, _REALinput, 6314),
  test(part2, _TESTinput2, 36),
  test(part2, _REALinput, 2504),
]);