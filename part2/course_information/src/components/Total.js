import React from "react";

// part 2.2 - already done during part 1
const Total = (props) => {
  const exTotals = props.totals.reduce((a, c) => a + c.exercises, 0)
  return <strong>Total number of exercises: {exTotals}</strong>;
};

export default Total;
