import React, { useState, useEffect, Fragment } from "react";
import blogService from "./services/blogs";
import Blog from "./components/Blog";
import MessageBlock from "./components/MessageBlock";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import { useDispatch } from "react-redux";

import "./App.css";

const App = () => {
  // const dispatch = useDispatch();

  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState({ token: "", name: "", username: "" });
  // const [msgBlock, setMsgBlock] = useState({ css: "", msg: "" });

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

  const blogsList = blogs
    ? blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => <Blog key={blog.id} blog={blog} user={user} />)
    : "loading...";

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
            <BlogForm setBlogs={setBlogs} blogs={blogs} user={user} />
          </Togglable>
          <h2>Blog Links</h2>
          {blogsList.length > 0 ? blogsList : "No blog links!"}
        </Fragment>
      )}
    </div>
  );
};

export default App;
