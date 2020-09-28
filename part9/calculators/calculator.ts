// ======================== EXAMPLE ============================

// Operation is like enum
type Operation = "multiply" | "add" | "divide";
type Result = number | string;

// bad b/c it shouldn't really also return a string
const calculatorBad = (a: number, b: number, op: Operation): Result => {
  if (op === "multiply") {
    return a * b;
  } else if (op === "add") {
    return a + b;
  } else if (op === "divide") {
    if (b === 0) return "can't divide by 0!";
    return a / b;
  }
};
calculatorBad(10, 2, "add");

// better so you can throw error
const calculator = (a: number, b: number, op: Operation): number => {
  switch (op) {
    case "multiply":
      return a * b;
    case "divide":
      if (b === 0) throw new Error("Can't divide by 0!");
      return a / b;
    case "add":
      return a + b;
    default:
      throw new Error("Operation is not multiply, add or divide!");
  }
};

try {
  console.log("Calculate:", calculator(1, 5, "divide"));
} catch (e) {
  console.log("Something went wrong, error message: ", e.message);
}
