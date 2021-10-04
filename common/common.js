const fs = require('fs')
const path = require('path')

const returnInput = (filename) => {
    return fs.readFileSync(path.resolve(__dirname, filename), 'utf-8')
}

const inputToArray = (filename, splitter) => {
    return returnInput(filename).split(splitter)
}

module.exports = {
    inputToArray
}