import React from "react";
import { CoursePart } from "../types";
import Part from "./Part";

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  const mapCourses = courseParts?.map((p, i) => <Part key={i} course={p} />);
  return <div>{mapCourses}</div>;
};

export default Content;
