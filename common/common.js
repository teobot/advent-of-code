const fs = require("fs");
const path = require("path");

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

module.exports = {
  inputToArray,
  inputToIntArray
};
