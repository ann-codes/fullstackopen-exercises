import React from "react";
// import { useParams } from "react-router-dom";

const Anecdote = ({ anecdote, vote }) => {
  // const id = useParams().id;
  // const foundAnec = anecdotes.find((a) => a.id === id);

  return anecdote ? (
    <div>
      <h2>"{anecdote.content}"</h2>
      <p>By {anecdote.author}.</p>
      <p>Has {anecdote.votes} votes.</p>
      <button onClick={() => vote(anecdote.id)}>vote</button>
    </div>
  ) : (
    <p>loading...</p>
  );
};

export default Anecdote;
