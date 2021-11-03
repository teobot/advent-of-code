const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const returnInput = (filename) => {
  return fs.readFileSync(path.resolve(__dirname, filename), "utf-8");
};

const inputToArray = (filename, splitter) => {
  return returnInput(filename).split(splitter);
};

const inputToIntArray = (filename, split) => {
  return returnInput(filename)
    .split(split)
    .map(function (item) {
      return parseInt(item, 10);
    });
};

function calculatePercentage(part, total) {
  return Math.round((part / total) * 100);
}

const tests = (tests) => {
  console.clear();
  let passedTests = 0;
  for (let i = 0; i < tests.length; i++) {
    const { f, input, expected } = tests[i];
    let result = f(input);
    let passedOrFail = result === expected;
    console.log(chalk`
      \tTest {underline #${i + 1}} {${
      passedOrFail ? "green.bold passed" : "red.bold failed"
    }}.
      \tExpected {green.bold ${expected}} ${
      passedOrFail ? "and" : "but"
    } got {${passedOrFail ? "green" : "red"}.bold ${result}}.
    `);
    if (passedOrFail) passedTests++;
  }
  console.log(chalk`
    \tPassed {green.bold ${passedTests}} out of {red.bold ${
    tests.length
  }} - ${calculatePercentage(passedTests, tests.length)}%.
  `);
};

const inputToString = (filename) => {
  return returnInput(filename);
}

function isOdd(num) { return num % 2;}


module.exports = {
  inputToArray,
  inputToIntArray,
  tests,
  inputToString,
  isOdd
};
