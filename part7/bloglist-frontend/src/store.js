import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import msgBlockReducer from "./reducers/msgBlockReducer";
import blogReducer from "./reducers/blogReducer";
import loginReducer from "./reducers/loginReducer";
import usersReducer from "./reducers/usersReducer";
import findUserReducer from "./reducers/findUserReducer";

const reducer = combineReducers({
  msgBlock: msgBlockReducer,
  blogs: blogReducer,
  usersList: usersReducer,
  user: loginReducer,
  oneUser: findUserReducer
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
