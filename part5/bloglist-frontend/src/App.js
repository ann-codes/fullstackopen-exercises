import React, { useState, useEffect, Fragment } from "react";
import blogService from "./services/blogs";
import userService from "./services/users";
import loginService from "./services/login";

import Blog from "./components/Blog";
import MessageBlock from "./components/MessageBlock";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

import "./App.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("bloglist-token", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (ex) {
      setMsgBlock({ css: "warning fade-out", msg: ex.response.data.error });
      // getting error message from json set in controller here ^^
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("bloglist-token");
    setUser(null);
  };

  const submitNewBlog = async (e) => {
    e.preventDefault();
    const payload = { ...newBlog };
    try {
      const userId = await userService.findIdByUsername(user.username);
      payload.userId = userId.id;
      const created = await blogService.create(payload);
      if (created) {
        setBlogs(blogs.concat({ ...payload, id: blogs.length + 1 }));
        setNewBlog({ title: "", author: "", url: "" });
        setMsgBlock({ css: "success fade-out", msg: "new blog added!" });
      }
    } catch (ex) {
      setMsgBlock({ css: "warning fade-out", msg: ex.response.data.error });
    }
  };

  const handleNewBlogChange = (e) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
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
      {!user ? (
        <LoginForm
          handleSubmit={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          username={username}
          password={password}
        />
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
              submitNewBlog={submitNewBlog}
              newBlog={newBlog}
              handleChange={handleNewBlogChange}
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
