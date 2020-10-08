import React from "react";
import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<{ course: CoursePart }> = ({ course }) => {
  switch (course.name) {
    case "Fundamentals":
      return (
        <div>
          <strong>{course.name}</strong> [{course.exerciseCount} exercise(s)]:{" "}
          {course.description}
        </div>
      );
    case "Using props to pass data":
      return (
        <div>
          <strong>{course.name}</strong> [{course.exerciseCount} exercise(s),{" "}
          {course.groupProjectCount} group project(s)]
        </div>
      );
    case "Deeper type usage":
      return (
        <div>
          <strong>{course.name}</strong> [{course.exerciseCount} exercise(s),{" "}
          <a
            href={course.exerciseSubmissionLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            submit exercises here
          </a>
          ]: {course.description}
        </div>
      );
    case "Ann's Programming Course":
      return (
        <div>
          <strong>{course.name}</strong> [{course.exerciseCount} exercise(s)]:{" "}
          {course.description}
        </div>
      );
    default:
      return assertNever(course);
  }
};

export default Part;
