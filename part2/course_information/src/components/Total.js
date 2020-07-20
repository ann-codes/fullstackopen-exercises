import React from "react";

const Total = (props) => {
  const exTotals = props.totals.reduce((a, c) => a + c.exercises, 0)
  return <strong>Total number of exercises: {exTotals}</strong>;
};

export default Total;
