import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import anecdoteReducer from "./reducers/anecdoteReducer";
import notificationReducer from "./reducers/notificationReducer";
import filterReducer from "./reducers/filterReducer";

// import anecService from "./services/anecdotes";

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer,
});

const store = createStore(reducer, composeWithDevTools());

// anecService.getAll().then((anecdotes) => {
//   // anecdotes.forEach((anec) => {
//   //   store.dispatch({ type: "NEW_ANECDOTE", data: anec });
//   // })
//   store.dispatch(initAnecdotes(anecdotes));
// });

export default store;
