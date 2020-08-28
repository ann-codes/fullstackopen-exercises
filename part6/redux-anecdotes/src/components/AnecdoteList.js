import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteOne } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const voteAnecdote = async (e) => {
    const foundAnec = anecdotes.find((a) => a.id === e.target.id);
    dispatch(voteOne(foundAnec.id, foundAnec));
    dispatch(setNotification(`You voted for: "${foundAnec.content}"`, 3));
  };

  const filteredAnecdotes = anecdotes.filter((anec) =>
    anec.content.toLowerCase().includes(filter.toLowerCase())
  );

  const isFiltered = filteredAnecdotes ? filteredAnecdotes : anecdotes;

  const listAnecdotes = isFiltered
    .sort((a, b) => b.votes - a.votes)
    .map((anecdote) => (
      <div key={anecdote.id}>
        <div className="bold-med">{anecdote.content}</div>
        <div>
          has {anecdote.votes}{" "}
          <button id={anecdote.id} onClick={voteAnecdote}>
            vote
          </button>
        </div>
      </div>
    ));

  return <>{listAnecdotes}</>;
};

export default AnecdoteList;
