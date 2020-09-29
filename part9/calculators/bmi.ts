interface bmiValues {
  heightInCm: number;
  weightInKg: number;
}

const parseArgs = (args: Array<string>): bmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      heightInCm: Number(args[2]),
      weightInKg: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateBmi = (heightInCm: number, weightInKg: number): string => {
  if (heightInCm <= 0) {
    return "Height must be greater than zero!";
  }
  let heightInM = heightInCm * 0.01; // convert centermeter to meter!
  let bmi = weightInKg / (heightInM * heightInM);
  //   console.log(bmi);
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi <= 25) {
    return "Normal (healthy weight)";
  } else if (bmi > 25 && bmi <= 30) {
    return "Overweight";
  } else {
    return "Obese";
  }
};

// assignment really SHOULD specify that it is height THEN weight as params!
// const heightInCm: number = Number(process.argv[2]);
// const weightInKg: number = Number(process.argv[3]);

try {
  const { heightInCm, weightInKg } = parseArgs(process.argv);
  console.log(calculateBmi(heightInCm, weightInKg));
} catch (e) {
  console.log("Error", e.message);
}
