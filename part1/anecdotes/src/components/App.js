import React, { useState } from "react";
import Button from "./Button";

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState({});

  const { anecdotes } = props;

  const getRandIndex = () => {
    const randIndex = Math.floor(anecdotes.length * Math.random());
    setSelected(randIndex);
  };

  const voteForAnecdote = () => {
    if (!points[selected]) {
      setPoints({ ...points, [selected]: 1 });
    } else {
      setPoints({ ...points, [selected]: points[selected] + 1 });
    }
  };

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>This anecdote has {points[selected] ? points[selected] : 0} votes.</p>
      <Button handleClick={voteForAnecdote} buttonName="Vote" />
      <Button handleClick={getRandIndex} buttonName="Next Anecdote" />
    </div>
  );
};

export default App;
