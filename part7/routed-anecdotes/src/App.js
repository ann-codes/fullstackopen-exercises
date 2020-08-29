import React, { useState } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Menu from "./components/Menu";
import About from "./components/About";
import AnecdoteList from "./components/AnecdoteList";
import CreateNew from "./components/CreateNew";
import Anecdote from "./components/Anecdote";
import Footer from "./components/Footer";

import "./App.css";

const initAnecdotes = [
  {
    content: "If it hurts, do it more often",
    author: "Jez Humble",
    info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
    votes: 0,
    id: "11",
  },
  {
    content: "Premature optimization is the root of all evil",
    author: "Donald Knuth",
    info: "http://wiki.c2.com/?PrematureOptimization",
    votes: 0,
    id: "22",
  },
];

const App = () => {
  const [anecdotes, setAnecdotes] = useState(initAnecdotes);
  const [notification, setNotification] = useState("");

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);
    const voted = { ...anecdote, votes: anecdote.votes + 1 };
    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  const match = useRouteMatch("/anecdotes/:id");
  const anec = match ? anecdotes.find((a) => a.id === match.params.id) : "";

  let timeout;
  const showNotif = () => {
    if (notification) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setNotification("");
      }, 5000);
    }
  };
  showNotif();

  return (
    <>
      <h1>Software Related Anecdotes</h1>
      <Menu />
      <Switch>
        <Route path="/anecdotes/:id">
          <Anecdote anecdote={anec} vote={vote} />
        </Route>
        <Route path="/anecdotes">
          <p>{notification}</p>
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/new">
          <CreateNew addNew={addNew} setNotification={setNotification} />
        </Route>
      </Switch>
      <Footer />
    </>
  );
};

export default App;
