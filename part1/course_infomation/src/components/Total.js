import React from "react";

const Total = (props) => {
  // part 1.4
  const exTotals = props.totals.reduce((a, c) => a + c.exercises, 0)
  return <p>Number of exercises {exTotals}</p>;
};

export default Total;
