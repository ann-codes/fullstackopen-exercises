import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import msgBlockReducer from "./reducers/msgBlockReducer";

const reducer = combineReducers({ msgBlock: msgBlockReducer });

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
