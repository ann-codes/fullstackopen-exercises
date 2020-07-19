import React, { useState } from "react";
import ReactDOM from "react-dom";
import Button from "./components/Button";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addOne = (stateSetter, state) => {
    const addOneInside = () => stateSetter(state + 1);
    return addOneInside;
  };

  const all = good + neutral + bad
  const average = ((good * 1) + (bad * -1))/all
  const positive = good/all

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={addOne(setGood, good)} buttonName="Good" />
      <Button handleClick={addOne(setNeutral, neutral)} buttonName="Neutral" />
      <Button handleClick={addOne(setBad, bad)} buttonName="Bad" />
      <h1>Statistics</h1>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {all}</p>
      <p>Average: {average?average:0}%</p>
      <p>Positive: {positive?positive:0}%</p>

    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
