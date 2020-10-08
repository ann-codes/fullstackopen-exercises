import React from "react";

interface CoursePart {
  name: string;
  exerciseCount: number;
}

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  const mapCourses = courseParts?.map((c, i) => (
    <p key={i}>
      {c.name} {c.exerciseCount}
    </p>
  ));
  
  return <div>{mapCourses}</div>;
};

export default Content;
