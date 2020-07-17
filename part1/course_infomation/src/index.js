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
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  const exercisesTotals = parts[0].exercises + parts[1].exercises + parts[2].exercises;

  return (
    <div>
      <Header course={course} />
      <Content
        part1={parts[0]}
        part2={parts[1]}
        part3={parts[2]}
      />
      <Total exercisesTotals={exercisesTotals} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
