// Advent of code 2021 -- Filename : main.js
// Task link -- https://adventofcode.com/2021/day/8
// Github link -- https://github.com/teobot/advent-of-code/tree/main/2021/task%208
// Created by Theo Clapperton

const { inputToArray, tests } = require("../../common/common");

const _REALinput = inputToArray("../2021/task 8/input.txt", "\n");
const _TESTinput = inputToArray("../2021/task 8/testinput.txt", "\n");

console.log(_TESTinput);

const part1 = (input) => {
  // part 1
  let c = 0;
  input.forEach((signalPattern) => {
    let [s, outputValues] = signalPattern.split(" | ");
    outputValues.split(" ").forEach((outputValue) => {
      if ([2, 4, 3, 7].includes(outputValue.length)) c++;
    });
  });
  return c;
};

const getDifference = (a, b) => {
  var i = 0;
  var j = 0;
  var result = "";

  while (j < b.length) {
    if (a[i] != b[j] || i == a.length) result += b[j];
    else i++;
    j++;
  }
  return result;
};

const newDifference = (longStr, shortStr) => {
  let returnStr = longStr;
  let shortArr = shortStr.split("");
  shortArr.forEach((str) => {
    returnStr = returnStr.replace(str, "");
  });
  return returnStr;
};

const part2 = (input) => {
  // part 2
  let sum = 0;
  input.forEach((inputRow) => {
    let [signalsRAW, outputValues] = inputRow.split(" | ");
    let signals = signalsRAW.split(" ");
    let segmentLetters = [
      {
        seg: "a",
        val: null,
      },
      {
        seg: "b",
        val: null,
      },
      {
        seg: "c",
        val: null,
      },
      {
        seg: "d",
        val: null,
      },
      {
        seg: "e",
        val: null,
      },
      {
        seg: "f",
        val: null,
      },
      {
        seg: "g",
        val: null,
      },
    ];
    let segmentJumbled = Array(8).fill(null);

    // find the values for 1, 4, 7 and 8
    segmentJumbled[1] = signals.find((s) => {
      return s.length === 2;
    });
    segmentJumbled[4] = signals.find((s) => {
      return s.length === 4;
    });
    segmentJumbled[7] = signals.find((s) => {
      return s.length === 3;
    });
    segmentJumbled[8] = signals.find((s) => {
      return s.length === 7;
    });

    // find "a" value by finding the difference between 1 and 7
    segmentLetters[0].val = newDifference(segmentJumbled[7], segmentJumbled[1]);

    // finding the number 9
    signals
      .filter((s) => {
        return s.length === 6;
      })
      .forEach((sixLengthSignal) => {
        if (newDifference(sixLengthSignal, segmentJumbled[4]).length === 2) {
          // this signal is the number 9
          segmentJumbled[9] = sixLengthSignal;
        }
      });

    // find the value for "e"
    segmentLetters[4].val = newDifference(segmentJumbled[8], segmentJumbled[9]);

    let SegmentSixNineAndZero = signals.filter((s) => {
      return s.length === 6;
    });

    // find segment 6
    SegmentSixNineAndZero.forEach((element) => {
      let includes = 0;
      if (element.split("").includes(segmentJumbled[1].split("")[0]))
        includes++;
      if (element.split("").includes(segmentJumbled[1].split("")[1]))
        includes++;
      if (includes === 1) {
        segmentJumbled[6] = element;
      }
    });

    SegmentSixNineAndZero = SegmentSixNineAndZero.filter((s) => {
      return s !== segmentJumbled[6];
    });

    // set segment 9 and 0
    SegmentSixNineAndZero.forEach((element) => {
      if (newDifference(element, segmentJumbled[4]).length === 3) {
        segmentJumbled[0] = element;
      }
      if (newDifference(element, segmentJumbled[4]).length === 2) {
        segmentJumbled[9] = element;
      }
    });

    // find value for "c"
    segmentLetters[2].val = newDifference(segmentJumbled[7], segmentJumbled[6]);

    // find the value for "f"
    segmentLetters[5].val = segmentJumbled[1].replace(
      segmentLetters.find((s) => {
        return s.seg === "c";
      }).val,
      ""
    );

    // find the value for "d"
    segmentLetters[3].val = newDifference(segmentJumbled[8], segmentJumbled[0]);

    // find what the values for 2
    segmentJumbled[2] = signals.filter((s) => {
      return s.length === 5 && newDifference(s, segmentJumbled[4]).length === 3;
    })[0];

    // find the value for "b"
    let diffBet2and0 = newDifference(segmentJumbled[0], segmentJumbled[2]);
    segmentLetters.forEach((sl) => {
      diffBet2and0 = diffBet2and0.replace(sl.val, "");
    });
    segmentLetters[1].val = diffBet2and0;

    // find the value for "g"
    let gValue = segmentJumbled[8];
    segmentLetters.forEach((sl) => {
      gValue = gValue.replace(sl.val, "");
    });
    segmentLetters[6].val = gValue;

    // we now have all the values for the segments
    let codes = outputValues.split(" ").map((code) => {
      let newCode = "";
      code.split("").forEach((char) => {
        newCode += segmentLetters.find((sl) => {
          return sl.val === char;
        }).seg;
      });
      return newCode.split("").sort().join("");
    });

    // codes have been decoded now check what each one means
    let endcode = parseInt(
      codes
        .map((code) => {
          if (code === "abcefg") return 0;
          if (code === "cf") return 1;
          if (code === "acfeg") return 2;
          if (code === "acdfg") return 3;
          if (code === "bcdf") return 4;
          if (code === "abdfg") return 5;
          if (code === "abdefg") return 6;
          if (code === "acf") return 7;
          if (code === "abcdefg") return 8;
          if (code === "abcdfg") return 9;
          return 2;
        })
        .join("")
    );
    sum += endcode;
  });

  return sum;
};

tests([
  {
    f: part1,
    input: [
      "acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf",
    ],
    expected: 0,
  },
  { f: part1, input: _TESTinput, expected: 26 },
  { f: part1, input: _REALinput, expected: 416 },
  { f: part2, input: [_TESTinput[0]], expected: 8394 },
  { f: part2, input: [_TESTinput[1]], expected: 9781 },
  { f: part2, input: [_TESTinput[2]], expected: 1197 },
  { f: part2, input: [_TESTinput[3]], expected: 9361 },
  { f: part2, input: [_TESTinput[4]], expected: 4873 },
  { f: part2, input: [_TESTinput[5]], expected: 8418 },
  { f: part2, input: [_TESTinput[6]], expected: 4548 },
  { f: part2, input: [_TESTinput[7]], expected: 1625 },
  { f: part2, input: [_TESTinput[8]], expected: 8717 },
  { f: part2, input: [_TESTinput[9]], expected: 4315 },
  { f: part2, input: _TESTinput, expected: 61229 },
  { f: part2, input: _REALinput, expected: 1043697 },
]);
