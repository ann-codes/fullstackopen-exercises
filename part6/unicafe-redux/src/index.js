import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

const App = () => {
  const genDispatcher = (typeVal) => {
    store.dispatch({ type: typeVal });
  };

  return (
    <div>
      <button onClick={() => genDispatcher("GOOD")}>good</button>
      <button onClick={() => genDispatcher("OK")}>neutral</button>
      <button onClick={() => genDispatcher("BAD")}>bad</button>
      <button onClick={() => genDispatcher("ZERO")}>reset</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

renderApp();
store.subscribe(renderApp);
