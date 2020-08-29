import React, { Fragment } from "react";
import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  const addAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = "";

    props.createAnecdote(content);
    props.setNotification(`You added an anecdote: "${content}"`, 3);
  };

  return (
    <Fragment>
      <h2>Create New Anecdote</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </Fragment>
  );
};

export default connect(null, { createAnecdote, setNotification })(AnecdoteForm);
