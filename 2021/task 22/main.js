// Advent of code 2021 -- Filename : main.js
// Task link -- https://adventofcode.com/2021/day/22
// Github link -- https://github.com/teobot/advent-of-code/tree/main/2021/task%2022
// Created by Theo Clapperton

const { inputToArray, tests } = require("../../common/common");

const _REALinput = inputToArray("../2021/task 22/input.txt", "\n");
const _TESTinput1 = [
  "on x=10..12,y=10..12,z=10..12",
  "on x=11..13,y=11..13,z=11..13",
  "off x=9..11,y=9..11,z=9..11",
  "on x=10..10,y=10..10,z=10..10",
];
const _TESTinput2 = [
  "on x=-20..26,y=-36..17,z=-47..7",
  "on x=-20..33,y=-21..23,z=-26..28",
  "on x=-22..28,y=-29..23,z=-38..16",
  "on x=-46..7,y=-6..46,z=-50..-1",
  "on x=-49..1,y=-3..46,z=-24..28",
  "on x=2..47,y=-22..22,z=-23..27",
  "on x=-27..23,y=-28..26,z=-21..29",
  "on x=-39..5,y=-6..47,z=-3..44",
  "on x=-30..21,y=-8..43,z=-13..34",
  "on x=-22..26,y=-27..20,z=-29..19",
  "off x=-48..-32,y=26..41,z=-47..-37",
  "on x=-12..35,y=6..50,z=-50..-2",
  "off x=-48..-32,y=-32..-16,z=-15..-5",
  "on x=-18..26,y=-33..15,z=-7..46",
  "off x=-40..-22,y=-38..-28,z=23..41",
  "on x=-16..35,y=-41..10,z=-47..6",
  "off x=-32..-23,y=11..30,z=-14..3",
  "on x=-49..-5,y=-3..45,z=-29..18",
  "off x=18..30,y=-20..-8,z=-3..13",
  "on x=-41..9,y=-7..43,z=-33..15",
  "on x=-54112..-39298,y=-85059..-49293,z=-27449..7877",
  "on x=967..23432,y=45373..81175,z=27513..53682",
];

const maxValues = 50;

const parseInput = (item) => {
  let [command, args] = item.split(" ");
  let [x, y, z] = args.split(",");

  // remove 2 chars from x,y,z
  let x1 = parseInt(x.slice(2));
  let y1 = parseInt(y.slice(2));
  let z1 = parseInt(z.slice(2));

  // remove 2 chars from x,y,z
  let x2 = parseInt(x.split("..")[1]);
  let y2 = parseInt(y.split("..")[1]);
  let z2 = parseInt(z.split("..")[1]);

  x1 = Math.max(maxValues * -1, x1);
  x1 = Math.min(maxValues, x1);
  x2 = Math.max(maxValues * -1, x2);
  x2 = Math.min(maxValues, x2);
  y1 = Math.max(maxValues * -1, y1);
  y1 = Math.min(maxValues, y1);
  y2 = Math.max(maxValues * -1, y2);
  y2 = Math.min(maxValues, y2);
  z1 = Math.max(maxValues * -1, z1);
  z1 = Math.min(maxValues, z1);
  z2 = Math.max(maxValues * -1, z2);
  z2 = Math.min(maxValues, z2);

  return {
    command,
    x: [x1, x2],
    y: [y1, y2],
    z: [z1, z2],
  };
};

const part1 = (input) => {
  // part 1

  let lights = [];

  input.map(parseInput).forEach((step, index) => {
    for (let x = step.x[0]; x < step.x[1] + 1; x++) {
      for (let y = step.y[0]; y < step.y[1] + 1; y++) {
        for (let z = step.z[0]; z < step.z[1] + 1; z++) {
          let obj = { key: `${x},${y},${z}`, x, y, z, on: step.command };
          // if the lights array contains a object with key = x,y,z
          // then update the on value
          if (lights.find((light) => light.key === obj.key)) {
            const index = lights.findIndex((light) => light.key === obj.key);
            lights[index].on = step.command;
          } else {
            // else add the object to the lights array
            lights.push(obj);
          }
        }
      }
    }
  });

  return lights.filter(
    (light) =>
      light.on === "on" &&
      light.x >= maxValues * -1 &&
      light.x <= maxValues &&
      light.y >= maxValues * -1 &&
      light.y <= maxValues &&
      light.z >= maxValues * -1 &&
      light.z <= maxValues
  ).length;
};

const part2 = (input) => {
  // part 2

  return 0;
};

tests([
  {
    f: part1,
    input: _TESTinput1,
    expected: 39,
    enabled: false,
  },
  {
    f: part1,
    input: _TESTinput2,
    expected: 590784,
    enabled: true,
  },
  //{ f: part1, input: _REALinput, expected: 0 },
  //{ f: part2, input: _TESTinput, expected: 0 },
  //{ f: part2, input: _REALinput, expected: 0 },
]);
