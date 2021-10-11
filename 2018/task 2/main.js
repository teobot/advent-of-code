// Advent of code 2018 -- Filename : main.js
// Created by Theo Clapperton
// Started @ 2021-10-11 13:21:41
// Finished @ 2021-10-11 14:04:52
// Time Taken = 0 hours, 43 minutes and 11 seconds

const { inputToArray } = require("../../common/common");

const _REALinput = inputToArray("../2018/task 2/input.txt", "\n");

const _TESTinput = [
  "abcde",
  "fghij",
  "klmno",
  "pqrst",
  "fguij",
  "axcye",
  "wvxyz",
];

const part1 = (input) => {
  // part 1

  // variables for keeping track of how many doubles and triples have been found
  let containsDouble = 0;
  let containsTriple = 0;

  // for each line in the input
  for (let i = 0; i < input.length; i++) {
    const boxId = input[i];
    let foundDouble = false;
    let foundTriple = false;

    for (let c = 0; c < boxId.split("").length; c++) {
      // for each character in the boxId

      // char is the current character in the boxId
      const char = boxId.split("")[c];

      // count the number of times the current character appears in the boxId
      const charCountInString = boxId.split(char).length - 1;

      // if the current character appears more than once in the boxId
      if (charCountInString > 1) {
        // if the current character appears twice in the string
        if (charCountInString === 2 && !foundDouble) {
          containsDouble++;
          foundDouble = true;
        }

        // if the current character appears three times in the string
        if (charCountInString === 3 && !foundTriple) {
          containsTriple++;
          foundTriple = true;
        }
      }

      if (foundDouble && foundTriple) {
        // skip counting if we already found a double and triple
        break;
      }
    }
  }

  console.log(
    `There are ${containsDouble} doubles and ${containsTriple} triples.`
  );
  return containsDouble * containsTriple;
};

const part2 = (input) => {
  // part 2

  // this will become the found boxId
  let foundBoxId = "";

  // for each line in the input
  for (let i = 0; i < input.length; i++) {
    const boxId = input[i];

    // for each character in the boxId
    for (let ii = 0; ii < input.length; ii++) {
      const boxId_other = input[ii];
      let differences = 0;

      // for each character in the boxId_other
      for (let cc = 0; cc < boxId.split("").length; cc++) {
        // character is the current character in the boxId
        const character = boxId.split("")[cc];

        // if the current character is not the same as the current character in the boxId_other
        // then we have a difference, so count it
        if (character !== boxId_other[cc]) {
          differences++;
        }
      }

      // if the number of differences is 1, then we have found the boxId,
      // so we can stop looking
      if (differences === 1) {
        console.log(`The boxIds are ${boxId} and ${boxId_other}`);

        // for each character in the boxId, check what the difference is
        for (let i = 0; i < boxId.split("").length; i++) {
          const char = boxId.split("")[i];

          // generate the boxId using the characters that are the same in both boxIds
          if (char === boxId_other[i]) {
            foundBoxId += char;
          }
        }

        // return the found boxId
        return foundBoxId;
      }
    }
  }
};

console.log({ task: 1, value: part1(_REALinput) });
console.log({ task: 2, value: part2(_REALinput) });
