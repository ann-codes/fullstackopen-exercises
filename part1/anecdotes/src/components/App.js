import React, { useState } from "react";
import Button from "./Button";

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState({});

  const { anecdotes } = props;

  //   let win = -1;
  //   let hiVotes = -1;
  //   for (let key in points) {
  //     if (points[key] > hiVotes) {
  //       win = key;
  //       hiVotes = points[key];
  //     }
  //   }

  // same as above that is commented out, but using reduce for practice
  let winner = Object.keys(points).reduce((highest, current) => {
    if (!points[highest] || points[current] > points[highest]) {
      highest = current;
    }
    return highest;
  }, -1);

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

  const winnerText = points[winner] ? (
    <p>
      This anecdote is the winner with {points[winner] ? points[winner] : 0}{" "}
      votes.
    </p>
  ) : (
    <p>Go vote!</p>
  );

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <p>{anecdotes[selected]}</p>
      <p>This anecdote has {points[selected] ? points[selected] : 0} votes.</p>
      <Button handleClick={voteForAnecdote} buttonName="Vote" />
      <Button handleClick={getRandIndex} buttonName="Next Anecdote" />
      <h1>Winning Anecdote</h1>
      <p>{anecdotes[winner] ? anecdotes[winner] : "Which quote will win?"}</p>
      {winnerText}
    </div>
  );
};

export default App;
