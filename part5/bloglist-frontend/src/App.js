import React, { useState, useEffect, Fragment } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import userService from "./services/users";
import loginService from "./services/login";

import "./App.css";
import MessageBlock from "./components/MessageBlock";

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

  // =========== helper change to component later
  const loginForm = () => (
    <Fragment>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </Fragment>
  );

  const createNewBlog = () => (
    <div>
      <h2>Add New Blog</h2>
      <form onSubmit={submitNewBlog}>
        <div>
          Title:
          <input
            type="text"
            value={newBlog.title}
            name="title"
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, title: target.value })
            }
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={newBlog.author}
            name="author"
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, author: target.value })
            }
          />
        </div>
        <div>
          Url:
          <input
            type="text"
            value={newBlog.url}
            name="url"
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, url: target.value })
            }
          />
        </div>
        <button type="submit">Add blog</button>
      </form>
    </div>
  );

  // =========== helper change to component later, combine w/ return obj below
  const blogsList = blogs
    ? blogs.map((blog) => <Blog key={blog.id} blog={blog} />)
    : "loading...";

  return (
    <div>
      <MessageBlock msgBlock={msgBlock} setter={setMsgBlock} />
      {!user ? (
        loginForm()
      ) : (
        <Fragment>
          <div>
            {user.name} logged-in<button onClick={handleLogout}>Logout</button>
          </div>
          {createNewBlog()}
          <h2>{user.name}'s Blogs</h2>
          {blogsList}
        </Fragment>
      )}
    </div>
  );
};

export default App;
