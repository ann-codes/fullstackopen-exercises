import React, {useState} from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header.js";
import Content from "./components/Content.js";
import Total from "./components/Total";

// part 1.1 (note part 1.2 is in the components/Part.js file)
const App = () => {
  // part 1.5
  const course = {
    name: "Half Stack application development",
    parts: [
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
    ],
  };

  const [value, setValue] = useState(0);

  // notes: returninig a function within a function
  const setToValue = (newValue) => () => {
    setValue(newValue);
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total totals={course.parts} />

      <div>
        {value}
        <button onClick={setToValue(1000)}>thousand</button>
        <button onClick={setToValue(0)}>reset</button>
        <button onClick={setToValue(value + 1)}>increment</button>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
