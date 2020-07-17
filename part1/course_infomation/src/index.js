import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header.js";
import Content from "./components/Content.js";
import Total from "./components/Total";

// part 1.1 (note part 1.2 is in the components/Part.js file)
const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];
  const exTotals = parts.reduce((a, c) => a + c.exercises, 0)

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total exercisesTotals={exTotals} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
