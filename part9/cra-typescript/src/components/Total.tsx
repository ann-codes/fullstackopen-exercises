import React from "react";

interface CoursePart {
  name: string;
  exerciseCount: number;
}

const Total: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  const totalExercise = courseParts.reduce(
    (carry, part) => carry + part.exerciseCount,
    0
  );

  return <p>Number of exercises: {totalExercise}</p>;
};

export default Total;
