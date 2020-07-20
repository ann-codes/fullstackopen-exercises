import React, { Fragment } from "react";
import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = (props) => {
  const { course } = props;

  return (
    <Fragment>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total totals={course.parts} />
    </Fragment>
  );
};

export default Course;
