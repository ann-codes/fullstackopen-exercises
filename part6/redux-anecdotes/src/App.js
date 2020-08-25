import React from "react";

import AnecdoteList from "./components/AnecdoteList";
import "./App.css";
import AnecdoteForm from "./components/AnecdoteForm";

const App = () => {
  return (
    <div className="m-content">
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
