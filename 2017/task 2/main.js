// Advent of code 2017 -- Filename : main.js
// Created by Theo Clapperton
// Started @ 2021-10-12 15:02:21
// Finished @ 2021-10-12 15:12:09
// Time Taken =  0 hours, 9 minutes and 48 seconds

const { inputToArray } = require("../../common/common");

const _REALinput = inputToArray("../2017/task 2/input.txt", "\n");

const _TESTinput = ["5\t9\t2\t8", "9\t4\t7\t3", "3\t8\t6\t5"]

const part1 = (input) => {
    // part 1
    let checksum = 0;
    for (let i = 0; i < input.length; i++) {
        const values = input[i].split("\t");
        checksum += Math.max.apply(Math, values) - Math.min.apply(Math, values);
    }
    return checksum;
}

const part2 = (input) => {
    // part 2
    let sum = 0;
    for (let i = 0; i < input.length; i++) {
        const values = input[i].split("\t");
        for (let ii = 0; ii < values.length; ii++) {
            const val = values[ii];
            for (let iii = 0; iii < values.length; iii++) {
                const valOTHER = values[iii];
                if(val != valOTHER && val % valOTHER == 0) {
                    sum += val / valOTHER;
                }
            }
        }
    }
    return sum;
}


console.log({task: 1, value: part1(_REALinput)});
console.log({task: 2, value: part2(_REALinput)});