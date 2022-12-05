// Advent of code 2022 -- Filename : main.js
// Task link -- https://adventofcode.com/2022/day/5
// Github link -- https://github.com/teobot/advent-of-code/tree/main/2022/task%205
// Input link -- https://adventofcode.com/2022/day/5/input
// Run Using -- node './2022/task 5/main.js'
// Created by Theo Clapperton

const { inputToArray, test, tests } = require("../../common/common");

const _REALinput = inputToArray("../2022/task 5/input.txt", "\n\n");
const _TESTinput = inputToArray("../2022/task 5/test.txt", "\r\n\r\n");

let stacksTEST_1 = [["Z", "N"], ["M", "C", "D"], ["P"]];
let stacksTEST_2 = [["Z", "N"], ["M", "C", "D"], ["P"]];
let stackReal_1 = [
  ["h", "c", "r"],
  ["b", "j", "h", "l", "s", "f"],
  ["r", "m", "d", "h", "j", "t", "q"],
  ["s", "g", "r", "h", "z", "b", "j"],
  ["r", "p", "f", "z", "t", "d", "c", "b"],
  ["t", "h", "c", "g"],
  ["s", "n", "v", "z", "b", "p", "w", "l"],
  ["r", "j", "q", "g", "c"],
  ["l", "d", "t", "r", "h", "p", "f", "s"],
];
let stackReal_2 = [
  ["h", "c", "r"],
  ["b", "j", "h", "l", "s", "f"],
  ["r", "m", "d", "h", "j", "t", "q"],
  ["s", "g", "r", "h", "z", "b", "j"],
  ["r", "p", "f", "z", "t", "d", "c", "b"],
  ["t", "h", "c", "g"],
  ["s", "n", "v", "z", "b", "p", "w", "l"],
  ["r", "j", "q", "g", "c"],
  ["l", "d", "t", "r", "h", "p", "f", "s"],
];

const part1 = ({ input, targetStack }) => {
  // part 1
  let [_s, _i] = input;
  let myStack = targetStack;

  const instructions = _i.split("\n").map((i) => {
    let _ii = i.split(" ");
    return {
      action: _ii[0],
      count: parseInt(_ii[1]),
      from: parseInt(_ii[3] - 1),
      target: parseInt(_ii[5] - 1),
    };
  });

  instructions.forEach((instruct) => {
    for (let i = 0; i < instruct.count; i++) {
      let _from = myStack[instruct.from].pop();
      myStack[instruct.target].push(_from);
    }
  });

  // get the last item from each stack
  let _last = myStack.map((s) => s[s.length - 1]);
  let _lastString = _last.join("");
  return _lastString.toUpperCase();
};

const part2 = ({ input, targetStack }) => {
  // part 2
  let [_s, _i] = input;
  let myStack = targetStack;

  const instructions = _i.split("\n").map((i) => {
    let _ii = i.split(" ");
    return {
      action: _ii[0],
      count: parseInt(_ii[1]),
      from: parseInt(_ii[3] - 1),
      target: parseInt(_ii[5] - 1),
    };
  });

  instructions.forEach((instruct) => {
    // can only move from the top of the stack
    // can move multiple items at once
    let _from = myStack[instruct.from].slice(
        myStack[instruct.from].length - instruct.count,
        myStack[instruct.from].length
      ),
      _target = myStack[instruct.target];

    //add the from to the target
    _target.push(..._from);

    // remove the from from the from
    myStack[instruct.from].splice(
      myStack[instruct.from].length - instruct.count,
      instruct.count
    );
  });

  // get the last item from each stack
  let _last = myStack.map((s) => s[s.length - 1]);
  let _lastString = _last.join("");
  return _lastString.toUpperCase();
};

tests([
  test(part1, { input: _TESTinput, targetStack: stacksTEST_1 }, "CMZ"),
  test(part1, { input: _REALinput, targetStack: stackReal_1 }, "SHQWSRBDL"),
  test(part2, { input: _TESTinput, targetStack: stacksTEST_2 }, "MCD"),
  test(part2, { input: _REALinput, targetStack: stackReal_2 }, "CDTQZHBRS"),
]);
