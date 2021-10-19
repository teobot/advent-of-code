// Advent of code 2018 -- Filename : main.js
// Created by Theo Clapperton
// Started @ 2021-10-19 12:46:07
// Finished @ 2021-10-19 13:36:42
// Time Taken = 0 hours, 50 minutes and 35 seconds

const { inputToArray } = require("../../common/common");

const _REALinput = inputToArray("../2018/task 3/input.txt", "\n");

const _TESTinput = ["#1 @ 1,3: 4x4", "#2 @ 3,1: 4x4", "#3 @ 5,5: 2x2"];

const part1 = (input) => {
  // part 1

  // create a array of 1000 arrays
  const fabric = [];
  let size = 1000;
  for (let i = 0; i < size; i++) {
    fabric[i] = [];
    for (let j = 0; j < size; j++) {
      fabric[i][j] = 0;
    }
  }

  // for each of the input
  for (let i = 0; i < input.length; i++) {
    if (!input[i]) {
      // if the input is blank then continue
      continue;
    }

    // parse all the data from the claim string
    let claim = input[i];
    let claimDetails = claim.split(" ");
    let id = claimDetails[0].replace("#", "");
    let x = parseInt(claimDetails[2].split(",")[0]);
    let y = parseInt(claimDetails[2].split(",")[1].replace(":", ""));
    let width = parseInt(claimDetails[3].split("x")[0]);
    let height = parseInt(claimDetails[3].split("x")[1]);

    // for each of the width and height of the claim
    // check if the fabric has had a claim otherwise add the claim
    for (let xx = 0; xx < width; xx++) {
      for (let yy = 0; yy < height; yy++) {
        if (fabric[x + xx][y + yy] === 0) {
          fabric[x + xx][y + yy] = 1;
        } else {
          fabric[x + xx][y + yy] = 2;
        }
      }
    }
  }

  // calculate the number of squares that have been claimed
  let squareInches = 0;
  for (let i = 0; i < fabric.length; i++) {
    const row = fabric[i];
    for (let j = 0; j < row.length; j++) {
      if (fabric[i][j] > 1) {
        squareInches++;
      }
    }
  }

  return squareInches;
};

const part2 = (input) => {
  // part 2

  // create a array of 1000 arrays
  const fabric = [];
  let size = 1000;
  for (let i = 0; i < size; i++) {
    fabric[i] = [];
    for (let j = 0; j < size; j++) {
      fabric[i][j] = 0;
    }
  }

  // store the overlaps in a object
  let overlaps = {};

  // for each of the input
  for (let i = 0; i < input.length; i++) {
    if (!input[i]) {
      // if the input is blank then continue
      continue;
    }

    // parse all the data from the claim string
    let claim = input[i];
    let claimDetails = claim.split(" ");
    let id = claimDetails[0].replace("#", "");
    let x = parseInt(claimDetails[2].split(",")[0]);
    let y = parseInt(claimDetails[2].split(",")[1].replace(":", ""));
    let width = parseInt(claimDetails[3].split("x")[0]);
    let height = parseInt(claimDetails[3].split("x")[1]);

    // set the overlay for this input to false
    overlaps[id] = false;

    // for each of the width and height of the claim
    // check if the fabric has had a claim otherwise add the claim
    // If already claimed than add the id to the overlaps object and set the overlay to true
    for (let xx = 0; xx < width; xx++) {
      for (let yy = 0; yy < height; yy++) {
        if (fabric[x + xx][y + yy] === 0) {
          fabric[x + xx][y + yy] = id;
        } else {
          overlaps[id] = true;
          overlaps[fabric[x + xx][y + yy]] = true;
          fabric[x + xx][y + yy] = "x";
        }
      }
    }
  }

  // find the id that has not been overlapped
  // foreach of the values in the object check if the value is true
  let noOverlap = "";
  Object.keys(overlaps).forEach((key) => {
    if (!overlaps[key]) {
      noOverlap = key;
    }
  });
  
  return noOverlap;
};

console.log({ task: 1, value: part1(_REALinput) });
console.log({ task: 2, value: part2(_REALinput) });
