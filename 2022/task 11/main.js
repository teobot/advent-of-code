// Advent of code 2022 -- Filename : main.js
// Task link -- https://adventofcode.com/2022/day/11
// Github link -- https://github.com/teobot/advent-of-code/tree/main/2022/task%2011
// Input link -- https://adventofcode.com/2022/day/11/input
// Run Using -- node './2022/task 11/main.js'
// Created by Theo Clapperton

const { inputToArray, test, tests } = require("../../common/common");

const _REALinput = inputToArray("../2022/task 11/input.txt", "\r\n\r\n");
const _TESTinput = inputToArray("../2022/task 11/test.txt", "\r\n\r\n");

const part1 = (input) => {
  // part 1
  let rounds = 20;
  let monkeyList = input.map((section) => {
    const [monkey, startingItems, operation, test, test1, test2] =
      section.split("\r\n");
    return {
      monkey: parseInt(monkey.charAt(monkey.length - 2)),
      startingItems: startingItems.split(": ").pop().split(", ").map(Number),
      operation: (old) => {
        return eval(
          operation.split(": ")[1].split("=")[1].trim().replace("old", old)
        );
      },
      devisableBy: parseInt(test.split(": ")[1].split("by")[1].trim()),
      ifTrueThrowTo: parseInt(
        test1
          .split(": ")
          .map((item) => item.trim())[1]
          .split("monkey")[1]
      ),
      ifFalseThrowTo: parseInt(
        test2
          .split(": ")
          .map((item) => item.trim())[1]
          .split("monkey")[1]
      ),
      inspections: 0,
    };
  });

  for (let i = 0; i < rounds; i++) {
    for (let monkeyIndex = 0; monkeyIndex < monkeyList.length; monkeyIndex++) {
      for (
        let itemIndex = 0;
        itemIndex < monkeyList[monkeyIndex].startingItems.length;
        itemIndex++
      ) {
        monkeyList[monkeyIndex].inspections++;

        // monkey picked the item up
        monkeyList[monkeyIndex].startingItems[itemIndex] = monkeyList[
          monkeyIndex
        ].operation(monkeyList[monkeyIndex].startingItems[itemIndex]);

        // divided by three and rounded down to the nearest integer.
        monkeyList[monkeyIndex].startingItems[itemIndex] = Math.floor(
          monkeyList[monkeyIndex].startingItems[itemIndex] / 3
        );

        if (
          monkeyList[monkeyIndex].startingItems[itemIndex] %
            monkeyList[monkeyIndex].devisableBy ===
          0
        ) {
          // throw to monkey if true
          // add the item to the end of the other monkeys list

          monkeyList[monkeyList[monkeyIndex].ifTrueThrowTo].startingItems.push(
            monkeyList[monkeyIndex].startingItems[itemIndex]
          );
        } else {
          // throw to monkey if false
          monkeyList[monkeyList[monkeyIndex].ifFalseThrowTo].startingItems.push(
            monkeyList[monkeyIndex].startingItems[itemIndex]
          );
        }
      }

      // remove all the items from the current monkeys list
      monkeyList[monkeyIndex].startingItems = [];
    }
  }
  monkeyList.sort((a, b) => b.inspections - a.inspections);

  return monkeyList[0].inspections * monkeyList[1].inspections;
};

const part2 = (input) => {
  // part 2
  let rounds = 10000;
  let monkeyList = input.map((section) => {
    const [monkey, startingItems, operation, test, test1, test2] =
      section.split("\r\n");
    return {
      monkey: parseInt(monkey.charAt(monkey.length - 2)),
      startingItems: startingItems.split(": ").pop().split(", ").map(Number),
      operation: (old) => {
        return eval(
          operation.split(": ")[1].split("=")[1].trim().replace("old", old)
        );
      },
      devisableBy: parseInt(test.split(": ")[1].split("by")[1].trim()),
      ifTrueThrowTo: parseInt(
        test1
          .split(": ")
          .map((item) => item.trim())[1]
          .split("monkey")[1]
      ),
      ifFalseThrowTo: parseInt(
        test2
          .split(": ")
          .map((item) => item.trim())[1]
          .split("monkey")[1]
      ),
      inspections: 0,
    };
  });
  const commonFactor = monkeyList
    .map((m) => m.devisableBy)
    .reduce((a, b) => a * b);

  for (let i = 0; i < rounds; i++) {
    for (let monkeyIndex = 0; monkeyIndex < monkeyList.length; monkeyIndex++) {
      for (
        let itemIndex = 0;
        itemIndex < monkeyList[monkeyIndex].startingItems.length;
        itemIndex++
      ) {
        monkeyList[monkeyIndex].inspections++;

        // monkey picked the item up
        monkeyList[monkeyIndex].startingItems[itemIndex] =
          monkeyList[monkeyIndex].operation(
            monkeyList[monkeyIndex].startingItems[itemIndex]
          ) % commonFactor;

        if (
          monkeyList[monkeyIndex].startingItems[itemIndex] %
            monkeyList[monkeyIndex].devisableBy ===
          0
        ) {
          // throw to monkey if true
          // add the item to the end of the other monkeys list

          monkeyList[monkeyList[monkeyIndex].ifTrueThrowTo].startingItems.push(
            monkeyList[monkeyIndex].startingItems[itemIndex]
          );
        } else {
          // throw to monkey if false
          monkeyList[monkeyList[monkeyIndex].ifFalseThrowTo].startingItems.push(
            monkeyList[monkeyIndex].startingItems[itemIndex]
          );
        }
      }

      // remove all the items from the current monkeys list
      monkeyList[monkeyIndex].startingItems = [];
    }
  }
  monkeyList.sort((a, b) => b.inspections - a.inspections);

  return monkeyList[0].inspections * monkeyList[1].inspections;
};

tests([
  test(part1, _TESTinput, 10605),
  test(part1, _REALinput, 55944),
  test(part2, _TESTinput, 2713310158),
  test(part2, _REALinput, 15117269860),
]);
