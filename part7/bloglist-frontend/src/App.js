import React, { useState, useEffect, Fragment } from "react";
import blogService from "./services/blogs";
// import Blog from "./components/Blog";
import MessageBlock from "./components/MessageBlock";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import { useDispatch } from "react-redux";
import { initBlogs } from "./reducers/blogReducer";

import "./App.css";
import BlogList from "./components/BlogList";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initBlogs());
  }, [dispatch]);

  // const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState({ token: "", name: "", username: "" });
  // const [msgBlock, setMsgBlock] = useState({ css: "", msg: "" });

  // useEffect(() => {
  //   (async function fetchData() {
  //     const blogs = await blogService.getAll();
  //     setBlogs(blogs);
  //   })();
  // }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("bloglist-token");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("bloglist-token");
    setUser({ token: "", name: "", username: "" });
  };

  return (
    <div>
      <h1>Blog List App</h1>
      <MessageBlock />
      {!user.token ? (
        <LoginForm setUser={setUser} />
      ) : (
        <Fragment>
          <div>
            {user.name} logged-in<button onClick={handleLogout}>Logout</button>
          </div>
          <Togglable
            buttonLabelOff="Nevermind, No Blog!"
            buttonLabelOn="Add New Blog?"
          >
            <BlogForm user={user} />
          </Togglable>
          <h2>Blog Links</h2>
          <BlogList user={user} />
        </Fragment>
      )}
    </div>
  );
};

export default App;
