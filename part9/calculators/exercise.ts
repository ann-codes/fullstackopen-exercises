const calculateExercises = (data: Array<number>, target: number): Object => {
  const average = data.reduce((a, b) => a + b, 0) / data.length;
  const targetReached = target >= average;
  let rating = -1;
  let description = "";

  if (average / target > 1.25) {
    rating = 3;
    description = "Amazing job!";
  } else if (average / target < 0.75) {
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
