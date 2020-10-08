import React from "react";
import { CoursePart } from "../types";

const Total: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  const totalExercise = courseParts.reduce(
    (carry, part) => carry + part.exerciseCount,
    0
  );

  return <strong>Number of exercises: {totalExercise}</strong>;
};

export default Total;
