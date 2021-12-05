// Advent of code 2021 -- Filename : main.js
// Task link -- https://adventofcode.com/2021/day/5
// Github link -- https://github.com/teobot/advent-of-code/tree/main/2021/task%205
// Created by Theo Clapperton

const { generateGrid, inputToArray, tests } = require("../../common/common");

const _REALinput = inputToArray("../2021/task 5/input.txt", "\n");

const getCoord = (coord) => {
  const [p1, p2] = coord.split(" -> ");
  const [x1, y1] = p1.split(",");
  const [x2, y2] = p2.split(",");
  return {
    x1: parseInt(x1),
    y1: parseInt(y1),
    x2: parseInt(x2),
    y2: parseInt(y2),
  };
};

const isHozOrVert = (coord) => {
  return coord.x1 === coord.x2 || coord.y1 === coord.y2;
};

const getMaxCoord = (coords) => {
  let maxX = 0;
  let maxY = 0;
  coords.forEach((coord) => {
    if (coord.x1 > maxX) {
      maxX = coord.x1;
    }
    if (coord.x2 > maxX) {
      maxX = coord.x2;
    }
    if (coord.y1 > maxY) {
      maxY = coord.y1;
    }
    if (coord.y2 > maxY) {
      maxY = coord.y2;
    }
  });
  return { maxX, maxY };
};

const returnAllPointsBetweenTwoCoords = (coord1, coord2) => {
  // return all the coordinates between two coordinates
  let points = [];
  let x1 = coord1.x;
  let y1 = coord1.y;
  let x2 = coord2.x;
  let y2 = coord2.y;
  let XPoints = [];
  let YPoints = [];
  if (x1 < x2) {
    // x1 is less than x2
    for (let x = x1; x <= x2; x++) {
      XPoints.push(x);
    }
  } else {
    // x1 is greater than x2
    for (let x = x1; x >= x2; x--) {
      XPoints.push(x);
    }
  }
  if (y1 < y2) {
    // y1 is less than y2
    for (let y = y1; y <= y2; y++) {
      YPoints.push(y);
    }
  } else {
    // y1 is greater than y2
    for (let y = y1; y >= y2; y--) {
      YPoints.push(y);
    }
  }
  XPoints.forEach((xcoord, i) => {
    points.push({ x: xcoord, y: YPoints[i] });
  });
  return points;
};

const part1 = (input) => {
  // part 1

  let coords = input.map(getCoord).filter(isHozOrVert);

  let { maxX, maxY } = getMaxCoord(coords);

  let grid = generateGrid(maxX, maxY, 0);

  coords.forEach((coord) => {
    let hoz = coord.x1 !== coord.x2;
    let vert = coord.y1 !== coord.y2;
    if (hoz) {
      if (coord.x1 < coord.x2) {
        for (let x = coord.x1; x <= coord.x2; x++) {
          grid[coord.y1][x] = grid[coord.y1][x] + 1;
        }
      } else {
        for (let x = coord.x1; x >= coord.x2; x--) {
          grid[coord.y1][x] = grid[coord.y1][x] + 1;
        }
      }
    }
    if (vert) {
      if (coord.y1 < coord.y2) {
        for (let y = coord.y1; y <= coord.y2; y++) {
          grid[y][coord.x1] = grid[y][coord.x1] + 1;
        }
      } else {
        for (let y = coord.y1; y >= coord.y2; y--) {
          grid[y][coord.x1] = grid[y][coord.x1] + 1;
        }
      }
    }
  });

  // count the number of times the number 2 appears in the grid
  let count = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] >= 2) {
        count++;
      }
    }
  }

  return count;
};

const part2 = (input) => {
  // part 2
  let coords = input.map(getCoord);

  let { maxX, maxY } = getMaxCoord(coords);

  let grid = generateGrid(maxX, maxY, 0);

  coords.forEach((coord) => {
    let hoz = coord.x1 !== coord.x2;
    let vert = coord.y1 !== coord.y2;
    if (hoz && !vert) {
      if (coord.x1 < coord.x2) {
        for (let x = coord.x1; x <= coord.x2; x++) {
          grid[coord.y1][x] = grid[coord.y1][x] + 1;
        }
      } else {
        for (let x = coord.x1; x >= coord.x2; x--) {
          grid[coord.y1][x] = grid[coord.y1][x] + 1;
        }
      }
    } else if (vert && !hoz) {
      if (coord.y1 < coord.y2) {
        for (let y = coord.y1; y <= coord.y2; y++) {
          grid[y][coord.x1] = grid[y][coord.x1] + 1;
        }
      } else {
        for (let y = coord.y1; y >= coord.y2; y--) {
          grid[y][coord.x1] = grid[y][coord.x1] + 1;
        }
      }
    } else {
      // the line is diagonal
      let numbersBetweenTheXPoints = returnAllPointsBetweenTwoCoords(
        { x: coord.x1, y: coord.y1 },
        { x: coord.x2, y: coord.y2 }
      );

      // foreach points mark it on the grid
      numbersBetweenTheXPoints.forEach((point) => {
        grid[point.y][point.x] = grid[point.y][point.x] + 1;
      });
    }
  });

  // count the number of times the number 2 appears in the grid
  let count = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] >= 2) {
        count++;
      }
    }
  }

  return count;
};

tests([
  {
    f: part1,
    input: [
      "0,9 -> 5,9",
      "8,0 -> 0,8",
      "9,4 -> 3,4",
      "2,2 -> 2,1",
      "7,0 -> 7,4",
      "6,4 -> 2,0",
      "0,9 -> 2,9",
      "3,4 -> 1,4",
      "0,0 -> 8,8",
      "5,5 -> 8,2",
    ],
    expected: 5,
  },
  {
    f: part1,
    input: _REALinput,
    expected: 6283,
  },
  {
    f: part2,
    input: [
      "0,9 -> 5,9",
      "8,0 -> 0,8",
      "9,4 -> 3,4",
      "2,2 -> 2,1",
      "7,0 -> 7,4",
      "6,4 -> 2,0",
      "0,9 -> 2,9",
      "3,4 -> 1,4",
      "0,0 -> 8,8",
      "5,5 -> 8,2",
    ],
    expected: 12,
  },
  {
    f: part2,
    input: _REALinput,
    expected: 18864,
  },
]);
