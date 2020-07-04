import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header.js";
import Content from "./components/Content.js";
import Total from "./components/Total";

// part 1.1 (note part 1.2 is in the components/Part.js file)
const App = () => {
  const course = "Half Stack application development";

  // this would be better if it was in some kind of data structure
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;
  const exercisesTotals = exercises1 + exercises2 + exercises3;

  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1}
        part2={part2}
        part3={part3}
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
      />
      <Total exercisesTotals={exercisesTotals} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
