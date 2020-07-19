import React, { Fragment } from "react";
import Stat from "./Stat";

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
      <table>
        <tbody>
          <Stat text="Good" value={good} />
          <Stat text="Neutral" value={neutral} />
          <Stat text="Bad" value={bad} />
          <Stat text="All" value={all} />
          <Stat text="Average" value={average ? average : 0} />
          <Stat text="Positive" value={(positive ? positive : 0) + "%"} />
        </tbody>
      </table>
    </Fragment>
  );
};

export default Statistics;
