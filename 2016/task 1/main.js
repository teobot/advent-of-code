// Advent of code 2016 -- Filename : main.js
// Created by Theo Clapperton
// Started @ 2021-10-05 14:27:31
// Finished @ 2021-10-05 15:57:25

const { inputToArray } = require("../../common/common");

const _REALinputs = inputToArray("../2016/task 1/input.txt", ", ");

const inputs = _REALinputs;

const part1 = () => {
  // part 1
  let loc = { x: 0, y: 0, d: "N" };
  const directions = ["N", "E", "S", "W"];

  for (let i = 0; i < inputs.length; i++) {
    const LeftOrRight = inputs[i].substring(0, 1);
    const Distance = parseInt(
      inputs[i].substring(1, inputs[i].split("").length)
    );

    if (LeftOrRight === "L") {
      loc.d =
        directions[
          directions.indexOf(loc.d) - 1 < 0
            ? directions.length - 1
            : directions.indexOf(loc.d) - 1
        ];
    } else {
      loc.d =
        directions[
          directions.indexOf(loc.d) + 1 > directions.length - 1
            ? 0
            : directions.indexOf(loc.d) + 1
        ];
    }

    switch (loc.d) {
      case "N":
        loc.y = loc.y + Distance;
        break;
      case "E":
        loc.x = loc.x + Distance;
        break;
      case "S":
        loc.y = loc.y - Distance;
        break;
      case "W":
        loc.x = loc.x - Distance;
        break;
      default:
        break;
    }
  }

  return loc.x + loc.y;
};

const part2 = () => {
  // part 2
  let loc = { x: 0, y: 0, d: "N" };
  const directions = ["N", "E", "S", "W"];
  const VisitedLocations = [];

  for (let i = 0; i < inputs.length; i++) {
    const LeftOrRight = inputs[i].substring(0, 1);
    const Distance = parseInt(
      inputs[i].substring(1, inputs[i].split("").length)
    );

    if (LeftOrRight === "L") {
      loc.d =
        directions[
          directions.indexOf(loc.d) - 1 < 0
            ? directions.length - 1
            : directions.indexOf(loc.d) - 1
        ];
    } else {
      loc.d =
        directions[
          directions.indexOf(loc.d) + 1 > directions.length - 1
            ? 0
            : directions.indexOf(loc.d) + 1
        ];
    }

    for (let d = 0; d < Distance; d++) {
      switch (loc.d) {
        case "N":
          loc.y = loc.y + 1;
          break;
        case "E":
          loc.x = loc.x + 1;
          break;
        case "S":
          loc.y = loc.y - 1;
          break;
        case "W":
          loc.x = loc.x - 1;
          break;
        default:
          break;
      }

      if (VisitedLocations.includes(`${loc.x},${loc.y}`)) {
        return loc;
      } else {
        VisitedLocations.push(`${loc.x},${loc.y}`);
      }
    }
  }
};

console.log({ task: 1, value: part1() });
console.log({ task: 2, value: part2() });
