// Advent of code 2021 -- Filename : main.js
// Task link -- https://adventofcode.com/2021/day/25
// Github link -- https://github.com/teobot/advent-of-code/tree/main/2021/task%2025
// Created by Theo Clapperton

const { inputToArray, tests } = require("../../common/common");

const _REALinput = inputToArray("../2021/task 25/input.txt", "\n");
const _TESTinput = [
  "v...>>.vv>",
  ".vv>>.vv..",
  ">>.>v>...v",
  ">>v>>.>.v.",
  "v>v.vv.v..",
  ">.>>..v...",
  ".vv..>.>v.",
  "v.v..>>v.v",
  "....v..v.>",
];

// const part1 = (map) => {
//   let i = 0;
//   let changed = true;
//   const W = map[0].length;
//   const H = map.length;
//   while (changed) {
//     changed = false;
//     for (let turn of [0, 1]) {
//       const newMap = map.map((row) => row.map((cell) => cell));
//       map.forEach((row, y) =>
//         row.forEach((cell, x) => {
//           if (turn === 0 && cell === ">") {
//             if (map[y][(x + 1) % W] === ".") {
//               newMap[y][x] = ".";
//               newMap[y][(x + 1) % W] = ">";
//               changed = true;
//             }
//           } else if (turn === 1 && cell === "v") {
//             if (map[(y + 1) % H][x] === ".") {
//               newMap[y][x] = ".";
//               newMap[(y + 1) % H][x] = "v";
//               changed = true;
//             }
//           }
//         })
//       );
//       map = newMap;
//     }
//     i++;
//   }

//   return i;
// };

const part1 = (input) => {
  // part 1
  let moving = true;

  let data = input.map((row) => {
    return row.split("").map((char) => {
      return { char, moved: false };
    });
  });

  let step = 0;
  while (moving) {
    step++;
    moving = false;

    const newData = data.map((row) => row.map((cell) => cell));
    for (let y = 0; y < data.length; y++) {
      for (let x = 0; x < data[y].length; x++) {
        if (
          newData[y][x].char === "." ||
          newData[y][x].char === "v" ||
          newData[y][x].moved
        )
          continue;

        let next_i = x + 1 < newData[y].length ? x + 1 : 0;

        if (newData[y][x].char === ">" && newData[y][next_i].char === ".") {
          newData[y][next_i].char = ">";
          newData[y][next_i].moved = true;
          newData[y][x].char = ".";
          newData[y][x].moved = false;
          moving = true;
        }
      }
    }

    for (let y = 0; y < newData.length; y++) {
      for (let x = 0; x < newData[y].length; x++) {
        if (
          newData[y][x].char === "." ||
          newData[y][x].char === ">" ||
          newData[y][x].moved
        )
          continue;

        let next_row_num = y + 1 < newData.length ? y + 1 : 0;

        if (
          newData[y][x].char === "v" &&
          newData[next_row_num][x].char === "."
        ) {
          newData[next_row_num][x].char = "v";
          newData[next_row_num][x].moved = true;
          newData[y][x].char = ".";
          newData[y][x].moved = false;
          moving = true;
        }
      }
    }

    data = newData;

    for (let yy = 0; yy < data.length; yy++) {
      for (let xx = 0; xx < data[yy].length; xx++) {
        if (data[yy][xx].moved) {
          data[yy][xx].moved = false;
        }
      }
    }
  }

  return step;
};

const part2 = (input) => {
  // part 2

  return 0;
};

tests([
  { f: part1, input: _TESTinput, expected: 58 },
  //{ f: part1, input: _REALinput, expected: 557 },
  //{ f: part2, input: _TESTinput, expected: 0 },
  //{ f: part2, input: _REALinput, expected: 0 },
]);
