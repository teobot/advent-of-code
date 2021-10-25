// Advent of code 2018 -- Filename : main.js
// Created by Theo Clapperton
// Started @ 2021-10-25 13:13:51
// Finished @ 2021-10-25 14:06:54
// Time Taken = Result: 0 hours, 53 minutes and 3 seconds

const { inputToArray } = require("../../common/common");

const _REALinput = inputToArray("../2018/task 4/input.txt", "\n");

const _TESTinput = [
  "[1518-11-01 00:00] Guard #10 begins shift",
  "[1518-11-01 00:05] falls asleep",
  "[1518-11-01 00:25] wakes up",
  "[1518-11-01 00:30] falls asleep",
  "[1518-11-01 00:55] wakes up",
  "[1518-11-01 23:58] Guard #99 begins shift",
  "[1518-11-02 00:40] falls asleep",
  "[1518-11-02 00:50] wakes up",
  "[1518-11-03 00:05] Guard #10 begins shift",
  "[1518-11-03 00:24] falls asleep",
  "[1518-11-03 00:29] wakes up",
  "[1518-11-04 00:02] Guard #99 begins shift",
  "[1518-11-04 00:36] falls asleep",
  "[1518-11-04 00:46] wakes up",
  "[1518-11-05 00:03] Guard #99 begins shift",
  "[1518-11-05 00:45] falls asleep",
  "[1518-11-05 00:55] wakes up",
];

const sortRecordsByDate = (records) => {
  return records.sort(function (a, b) {
    return new Date(a.date) - new Date(b.date);
  });
};

const part1 = (input) => {
  // part 1
  let timestamps = [];

  for (let i = 0; i < input.length; i++) {
    // parse the input to a array of timelog objects
    const guardLog = input[i];
    timestamps.push({
      date: new Date(guardLog.split("]")[0].substring(1)),
      action: guardLog.split("]")[1].trim(),
    });
  }

  // sort the timestamps
  timestamps = sortRecordsByDate(timestamps);

  // create a map of guard id to guard object
  let records = {};

  let currentGuard = null;
  let sleepStart = null;
  let sleepEnd = null;

  // loop through the timestamps
  for (let i = 0; i < timestamps.length; i++) {
    const timestamp = timestamps[i];

    // if the timestamp is a guard change
    if (timestamp.action.includes("Guard")) {
      currentGuard = timestamp.action.split(" ")[1].substring(1);
    }

    // if the timestamp is a sleep
    if (timestamp.action.includes("falls asleep")) {
      sleepStart = timestamp.date;
    }

    // if the timestamp is a wake up
    if (timestamp.action.includes("wakes up")) {
      // store the value the guard slept for
      sleepEnd = timestamp.date;

      // calculate the time the guard slept
      const sleepTime = sleepEnd.getMinutes() - sleepStart.getMinutes();
      if (!records[currentGuard]) {
        // if the guard is not in the records, create a new record
        records[currentGuard] = {};
      }

      // if the minute is not in the guard record, create a new record
      records[currentGuard].sleepTime =
        sleepTime + (records[currentGuard].sleepTime || 0);

      // if the guard in the records object doesn't have a record create one
      records[currentGuard].logs = records[currentGuard].logs || [];

      // create a new log object
      records[currentGuard].logs.push({
        start: sleepStart,
        end: sleepEnd,
      });
    }
  }

  // find the guard with the most sleep
  let mostAsleepGuard = null;

  // loop through the records
  for (const [key, value] of Object.entries(records)) {
    if (
      !mostAsleepGuard ||
      value.sleepTime > records[mostAsleepGuard].sleepTime
    ) {
      // if the guard is not in the records, create a new record
      // if the guard has more sleep than the current guard, set the current guard to the new guard
      mostAsleepGuard = key;
    }
  }

  // find the most slept minute
  let mostAsleepMinute = null;
  let mostAsleepMinuteCount = 0;
  for (let i = 0; i < 60; i++) {
    // loop through the minutes
    let count = 0;
    for (const log of records[mostAsleepGuard].logs) {
      // loop through the logs
      if (log.start.getMinutes() <= i && log.end.getMinutes() >= i) {
        // if the log falls within the minute
        count++;
      }
    }

    // if the count is greater than the current count, set the current count to the new count
    if (count > mostAsleepMinuteCount) {
      mostAsleepMinute = i;
      mostAsleepMinuteCount = count;
    }
  }

  // return the product of the guard id and the most slept minute
  return mostAsleepGuard * mostAsleepMinute;
};

const part2 = (input) => {
  // part 2
  let timestamps = [];

  for (let i = 0; i < input.length; i++) {
    // parse the input to a array of timelog objects
    const guardLog = input[i];
    timestamps.push({
      date: new Date(guardLog.split("]")[0].substring(1)),
      action: guardLog.split("]")[1].trim(),
    });
  }

  // sort the timestamps
  timestamps = sortRecordsByDate(timestamps);

  // create a map of guard id to guard object
  let records = {};

  let currentGuard = null;
  let sleepStart = null;
  let sleepEnd = null;

  // loop through the timestamps
  for (let i = 0; i < timestamps.length; i++) {
    const timestamp = timestamps[i];

    // if the timestamp is a guard change
    if (timestamp.action.includes("Guard")) {
      currentGuard = timestamp.action.split(" ")[1].substring(1);
    }

    // if the timestamp is a sleep
    if (timestamp.action.includes("falls asleep")) {
      sleepStart = timestamp.date;
    }

    // if the timestamp is a wake up
    if (timestamp.action.includes("wakes up")) {
      // store the value the guard slept for
      sleepEnd = timestamp.date;

      // calculate the time the guard slept
      const sleepTime = sleepEnd.getMinutes() - sleepStart.getMinutes();
      if (!records[currentGuard]) {
        // if the guard is not in the records, create a new record
        records[currentGuard] = {};
      }

      // if the minute is not in the guard record, create a new record
      records[currentGuard].sleepTime =
        sleepTime + (records[currentGuard].sleepTime || 0);

      // if the guard in the records object doesn't have a record create one
      records[currentGuard].logs = records[currentGuard].logs || [];

      // create a new log object
      records[currentGuard].logs.push({
        start: sleepStart,
        end: sleepEnd,
      });
    }
  }

  // find the guard that is most frequently asleep on the same minute
  let mostAsleepGuard = null;
  let mostAsleepMinute = null;
  let mostAsleepMinuteCount = 0;
  for (const [key, value] of Object.entries(records)) {
    for (let i = 0; i < 60; i++) {
      // loop through the minutes
      let count = 0;
      for (const log of value.logs) {
        // loop through the logs
        if (log.start.getMinutes() <= i && log.end.getMinutes() >= i) {
          // if the log falls within the minute
          count++;
        }
      }

      // if the count is greater than the current count, set the current count to the new count
      if (count > mostAsleepMinuteCount) {
        mostAsleepGuard = key;
        mostAsleepMinute = i;
        mostAsleepMinuteCount = count;
      }
    }
  }

  // return the product of the guard id and the most slept minute
  return mostAsleepGuard * mostAsleepMinute;
};

console.log({ task: 1, value: part1(_REALinput) });
console.log({ task: 2, value: part2(_REALinput) });
