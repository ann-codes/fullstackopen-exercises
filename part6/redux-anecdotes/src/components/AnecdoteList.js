import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteOne } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const listAnecdotes = anecdotes
    .sort((a, b) => b.votes - a.votes)
    .map((anecdote) => (
      <div key={anecdote.id}>
        <div className="bold-med">{anecdote.content}</div>
        <div>
          has {anecdote.votes}{" "}
          <button onClick={() => dispatch(voteOne(anecdote.id))}>vote</button>
        </div>
      </div>
    ));

  return <>{listAnecdotes}</>;
};

export default AnecdoteList;
