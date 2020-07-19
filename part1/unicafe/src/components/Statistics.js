import React, { Fragment } from "react";

const Statistics = (props) => {
  const { good, neutral, bad } = props;

  const all = good + neutral + bad;
  const average = (good * 1 + bad * -1) / all;
  const positive = (good / all) * 100;

  if (!good && !neutral && !bad) {
    return (
      <Fragment>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <h1>Statistics</h1>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {all}</p>
      <p>Average: {average ? average : 0}</p>
      <p>Positive: {positive ? positive : 0}%</p>
    </Fragment>
  );
};

export default Statistics;
