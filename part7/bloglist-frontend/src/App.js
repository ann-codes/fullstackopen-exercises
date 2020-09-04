import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageBlock from "./components/MessageBlock";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import BlogList from "./components/BlogList";
import { initBlogs } from "./reducers/blogReducer";
import { setUserByLocalStorage, logoutUser } from "./reducers/loginReducer";
import "./App.css";

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initBlogs());
    dispatch(setUserByLocalStorage());
  }, [dispatch]);

  return (
    <div>
      <h1>Blog List App</h1>
      <MessageBlock />
      {!user.token ? (
        <LoginForm />
      ) : (
        <Fragment>
          <div>
            {user.name} logged-in
            <button onClick={() => dispatch(logoutUser())}>Logout</button>
          </div>
          <Togglable buttonLabelOff="Cancel Add" buttonLabelOn="Add New Blog">
            <BlogForm user={user} />
          </Togglable>
          <h2>Blog Links</h2>
          <BlogList />
        </Fragment>
      )}
    </div>
  );
};

export default App;
