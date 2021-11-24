// Advent of code 2018 -- Filename : main.js
// Task link -- https://adventofcode.com/2018/day/8
// Github link -- https://github.com/teobot/advent-of-code/tree/main/2018/task%208
// Created by Theo Clapperton

const { inputToIntArray, tests } = require("../../common/common");

const _REALinput = inputToIntArray("../2018/task 8/input.txt", " ");
const _REALinput2 = inputToIntArray("../2018/task 8/input.txt", " "); // making a dup here since part1 edits the array

const part1 = (input) => {
  // part 1
  let sumOfAllMetadataEntries = 0; // sum of all metadata entries for the current node, which will be the root node to start

  let numberOfChildNodes = input.shift(); // get the number of child nodes and remove it from the input
  let numberOfMetadataEntries = input.shift(); // get the number of metadata entries and remove it from the input

  for (let i = 0; i < numberOfChildNodes; i++) {
    // foreach child node, recursively call the function
    sumOfAllMetadataEntries += part1(input); // add the sum of all metadata entries of the child node to the sum of all metadata entries
  }

  for (let i = 0; i < numberOfMetadataEntries; i++) {
    // foreach metadata entry, add it to the sum of all metadata entries
    sumOfAllMetadataEntries += input.shift(); // remove the metadata entry from the input and add it to the sum of all metadata entries
  }

  return sumOfAllMetadataEntries; // return the sum of all metadata entries
};

const part2 = (input) => {
  // part 2
  let numberOfChildNodes = input.shift(); // get the number of child nodes and remove it from the input
  let numberOfMetadataEntries = input.shift(); // get the number of metadata entries and remove it from the input

  if (numberOfChildNodes) {
    // if there are child nodes
    let sumOfMetadataEntries = 0; // sum of all metadata entries for the current node, which will be the root node to start
    
    let arrayOfChildNodes = []; // array of all child nodes
    for (let i = 0; i < numberOfChildNodes; i++) {
      // foreach child node, recursively call the function
      arrayOfChildNodes.push(part2(input)); // add the child node to the array of child nodes
    }

    let arrayOfMetadataEntries = []; // array of all metadata entries
    for (let i = 0; i < numberOfMetadataEntries; i++) {
      // foreach metadata entry, add it to the array of metadata entries
      arrayOfMetadataEntries.push(input.shift()); // remove the metadata entry from the input and add it to the array of metadata entries
    }

    for (let i = 0; i < arrayOfMetadataEntries.length; i++) {
      // foreach metadata entry
      if (arrayOfMetadataEntries[i] <= arrayOfChildNodes.length) {
        // if the metadata entry is less than or equal to the number of child nodes
        sumOfMetadataEntries +=
          arrayOfChildNodes[arrayOfMetadataEntries[i] - 1]; // add the value of the child node to the sum of metadata entries
      }
    }

    return sumOfMetadataEntries; // return the sum of metadata entries
  } else {
    // if there are no child nodes, return the sum of all metadata entries
    let sumOfAllMetadataEntries = 0; // sum of all metadata entries for the current node, which will be the root node to start
    for (let i = 0; i < numberOfMetadataEntries; i++) {
      // foreach metadata entry, add it to the sum of all metadata entries
      sumOfAllMetadataEntries += input.shift(); // remove the metadata entry from the input and add it to the sum of all metadata entries
    }
    return sumOfAllMetadataEntries; // return the sum of all metadata entries
  }
};

console.log({task: 1, result: part1(_REALinput)});
console.log({task: 2, result: part2(_REALinput2)});
