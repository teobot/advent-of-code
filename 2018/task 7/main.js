// Advent of code 2018 -- Filename : main.js
// Task link -- https://adventofcode.com/2018/day/7
// Github link -- https://github.com/teobot/advent-of-code/tree/main/2018/task%207
// Created by Theo Clapperton

const { inputToArray } = require("../../common/common");

const _REALinput = inputToArray("../2018/task 7/input.txt", "\n");

const returnStepData = (step) => {
  // return the step data
  return [step.charAt(5), step.charAt(36)];
};

const part1 = (input) => {
  // part 1
  let allSteps = input.map((step) => returnStepData(step));

  // find all steps
  let stepCountsArray = [];

  // find all the unique steps in the input
  let uniqueSteps = allSteps.reduce((acc, step) => {
    if (!acc.includes(step[0])) {
      acc.push(step[0]);
    }
    if (!acc.includes(step[1])) {
      acc.push(step[1]);
    }
    return acc;
  }, []);

  // for each unique step, find the steps that depend on it
  uniqueSteps.forEach((step) => {
    stepCountsArray.push({
      step, // the step
      stepsThatDependOnThis: () => allSteps.filter((b) => b[1] === step), // steps that depend on this step
    });
  });

  let stepOrderString = ""; // the return string

  // while there are steps that can be completed
  while (stepCountsArray.filter((step) => step).length) {
    // find the steps that don't depend on anything
    let next = stepCountsArray
      .filter((step) => !step.stepsThatDependOnThis().length)
      .sort((stepA, stepB) => (stepB.step > stepA.step ? -1 : 1))[0];

    // delete the step from the counts
    delete stepCountsArray[stepCountsArray.indexOf(next)];

    // add the step to the string
    stepOrderString += next.step;

    // find the steps that depend on the step we just added
    allSteps
      .filter((a) => a[0] == next.step)
      .forEach((a) => {
        // delete the step from the counts
        delete allSteps[allSteps.indexOf(a)];
      });
  }

  // return the step order string
  return stepOrderString;
};

const calculate_step_time = (step) => {
  // calculate the time it takes to complete a step
  return step.charCodeAt(0) - "A".charCodeAt(0) + 1 + 60;
};

const find_next_steps = (steps, prereq_step_pairs) => {
  // find the steps that don't depend on anything
  return steps.filter((step) => {
    return prereq_step_pairs.every((pair) => pair[1] !== step);
  });
};

const part2 = (input) => {
  // part 2
  const numberOfWorkers = 5; // number of workers

  let prereq_step_pairs = input.map((step) => returnStepData(step)); // all the steps and their prerequisites

  let allSteps = input.map((step) => returnStepData(step)); // all the steps

  // find all the unique steps in the input
  let steps = allSteps.reduce((acc, step) => {
    if (!acc.includes(step[0])) {
      acc.push(step[0]);
    }
    if (!acc.includes(step[1])) {
      acc.push(step[1]);
    }
    return acc;
  }, []);

  let time = 0; // the time it takes to complete the steps
  let workers = []; // the workers

  for (let i = 0; i < numberOfWorkers; i++) {
    // add the workers
    workers.push({ step: null, time: 0 });
  }

  while (steps.length || workers.some((w) => w.time > 0)) {
    // while there are steps or workers that are working
    for (let i = 0; i < workers.length; i++) {
      // for each worker

      workers[i].time = Math.max(workers[i].time - 1, 0); // decrease the workers time

      if (workers[i].time == 0) {
        // if the worker is done
        if (workers[i].step) {
          // if the worker is working on a step

          // find the steps that depend on the step the worker is working on
          prereq_step_pairs = prereq_step_pairs.filter(
            (pair) => pair[0] !== workers[i].step
          );

          workers[i].step = null; // remove the step from the worker
        }

        let next_steps = find_next_steps(steps, prereq_step_pairs); // find the steps that don't depend on anything

        if (next_steps.length) {
          // if there are steps that don't depend on anything

          step = next_steps[next_steps.length - 1]; // get the last step
          workers[i].time = calculate_step_time(step); // set the time it takes to complete the step
          workers[i].step = step; // set the step the worker is working on
          steps = steps.filter((s) => s !== step); // remove the step from the steps
        }
      }
    }

    time++; // increase the time
  }

  return time; // return the time
};

console.log({ task: 1, value: part1(_REALinput) });
console.log({ task: 2, value: part2(_REALinput) });
