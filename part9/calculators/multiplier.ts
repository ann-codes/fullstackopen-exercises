// ======================== EXAMPLE ============================

// include for type error handling
// interface is used to define shape of data structure
interface MultiplyValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: Array<string>): MultiplyValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

// function
const multiplicator = (a: number, b: number, printText: string) => {
  console.log(printText, a * b);
};

// take arguments on CLI w/ node argv
// eslint-disable-next-line @typescript-eslint/no-inferrable-types
const a: number = Number(process.argv[2]);
// eslint-disable-next-line @typescript-eslint/no-inferrable-types
const b: number = Number(process.argv[3]);
multiplicator(a, b, `Multiplied ${a} and ${b}, the result is:`);
// in CLI: yarn run mult 6 8 | npm run multiply 5 2

// error handling
try {
  const { value1, value2 } = parseArguments(process.argv);
  multiplicator(
    value1,
    value2,
    `Multiplied ${value1} and ${value2}, the result is:`
  );
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log("Error: ", e.message);
}
