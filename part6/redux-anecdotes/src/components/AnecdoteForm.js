import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { notify } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    dispatch(createAnecdote(content));
    dispatch(notify(`You added an anecdote: "${content}"`))

    e.target.anecdote.value = "";
  };

  return (
    <>
      <h2>Create New Anecdote</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
