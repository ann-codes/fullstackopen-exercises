interface output {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface exerciseInput {
  data: Array<number>;
  target: number;
}

const parseArgsEx = (args: Array<string>): exerciseInput => {
  if (args.length < 4) throw new Error("Not enough arguments!");

  const makeArray = args.slice(2);
  const numbersOnly = makeArray.filter((e) => !isNaN(Number(e)));

  if (makeArray.length === numbersOnly.length) {
    return {
      data: makeArray.slice(0, makeArray.length - 1).map((n) => Number(n)),
      target: Number(makeArray.slice(-1)),
    };
  } else {
    throw new Error("All input values must be numbers!!");
  }
};

const calculateExercises = (data: Array<number>, target: number): output => {
  const checkData = data.filter((d) => !isNaN(d));

  if (checkData.length !== data.length || isNaN(target)) {
    throw new Error(
      "malformatted parameters: all input values must be numbers"
    );
  }

  const average = data.reduce((a, b) => a + b, 0) / data.length;
  const targetReached = average >= target;
  let rating = -1;
  let description = "";

  if (average / target > 1.2) {
    rating = 3;
    description = "Amazing job!";
  } else if (average / target < 0.8) {
    rating = 1;
    description = "You really dropped the ball here!";
  } else {
    rating = 2;
    description = "Not bad, it could be better!";
  }

  return {
    periodLength: data.length,
    trainingDays: data.filter((d) => d > 0).length,
    success: targetReached,
    rating: rating,
    ratingDescription: description,
    target: target,
    average: average,
  };
};

try {
  const { data, target } = parseArgsEx(process.argv);
  console.log("DATA", data, "TARGET", target);
  console.log(calculateExercises(data, target));
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log("Error", e.message);
}

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
console.log("=======");

export default calculateExercises;
