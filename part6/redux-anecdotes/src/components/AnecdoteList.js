import React, { Fragment } from "react";
import { connect } from "react-redux";
import { voteOne } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = (props) => {
  const voteAnecdote = async (e) => {
    const foundAnec = props.anecdotes.find((a) => a.id === e.target.id);
    props.voteOne(foundAnec.id, foundAnec);
    props.setNotification(`You voted for: "${foundAnec.content}"`, 3);
  };

  const filteredAnecdotes = props.anecdotes.filter((anec) =>
    anec.content.toLowerCase().includes(props.filter.toLowerCase())
  );

  const isFiltered = filteredAnecdotes ? filteredAnecdotes : props.anecdotes;

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
  return <Fragment>{listAnecdotes}</Fragment>;
};

const mapStateToProps = (state) => ({
  anecdotes: state.anecdotes,
  filter: state.filter,
});

const mapDispatchToProps = { voteOne, setNotification };

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);

export default ConnectedAnecdoteList;
