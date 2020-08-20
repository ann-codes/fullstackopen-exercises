import React, { useState, useEffect, Fragment } from "react";
import blogService from "./services/blogs";

import Blog from "./components/Blog";
import MessageBlock from "./components/MessageBlock";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

import "./App.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState({ token: "", name: "", username: "" });
  const [msgBlock, setMsgBlock] = useState({ css: "", msg: "" });

  useEffect(() => {
    (async function fetchData() {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    })();
  }, []);

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

  // =========== helper change to component later, combine w/ return obj below
  const blogsList = blogs
    ? blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => <Blog key={blog.id} blog={blog} />)
    : "loading...";

  return (
    <div>
      <MessageBlock msgBlock={msgBlock} setter={setMsgBlock} />
      {!user.token ? (
        <LoginForm setUser={setUser} setMsgBlock={setMsgBlock} />
      ) : (
        <Fragment>
          <div>
            {user.name} logged-in<button onClick={handleLogout}>Logout</button>
          </div>
          <Togglable
            buttonLabelOff="Nevermind, No Blog!"
            buttonLabelOn="Add New Blog?"
          >
            <BlogForm
              setBlogs={setBlogs}
              setMsgBlock={setMsgBlock}
              blogs={blogs}
              user={user}
            />
          </Togglable>
          <h2>Blog Links</h2>
          {blogsList}
        </Fragment>
      )}
    </div>
  );
};

export default App;
