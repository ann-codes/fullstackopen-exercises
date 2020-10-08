interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CourseWithDescription extends CoursePartBase {
  description: string;
}

interface CourseWithGroupProjectCount extends CoursePartBase {
  groupProjectCount: number;
}

interface CoursePartOne extends CourseWithDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CourseWithGroupProjectCount {
  name: "Using props to pass data";
}

interface CoursePartThree extends CourseWithDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CourseWithDescription {
  name: "Ann's Programming Course";
}

export type CoursePart =
  | CoursePartOne
  | CoursePartTwo
  | CoursePartThree
  | CoursePartFour;
