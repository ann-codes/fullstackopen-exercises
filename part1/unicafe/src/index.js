import React, { useState } from "react";
import ReactDOM from "react-dom";
import Button from "./components/Button";
import Statistics from "./components/Statistics";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addOne = (stateSetter, state) => {
    const addOneInside = () => stateSetter(state + 1);
    return addOneInside;
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={addOne(setGood, good)} buttonName="Good" />
      <Button handleClick={addOne(setNeutral, neutral)} buttonName="Neutral" />
      <Button handleClick={addOne(setBad, bad)} buttonName="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
