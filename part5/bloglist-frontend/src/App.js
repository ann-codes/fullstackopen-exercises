import React, { useState, useEffect, Fragment } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

import "./App.css"

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // // ============ their original way
  // useEffect(() => {
  //   blogService
  //     .getAll()
  //     .then((blogs) => setBlogs(blogs))
  //     .catch((err) => console.log("Error", err));
  // }, []);

  // // ============ my old preferred way
  // const getAllBlogs = () => {
  //   blogService.getAll().then((blogs) => setBlogs(blogs));
  // };
  // useEffect(getAllBlogs, []);

  // // ============ using async/await
  // const getBlogs = async () => {
  //   const blogs = await blogService.getAllAA();
  //   setBlogs(blogs);
  // };
  // useEffect(() => {
  //   getBlogs();
  // }, []);

  // // ============ using async/await w/ IIFE
  useEffect(() => {
    (async function fetchData() {
      const blogs = await blogService.getAllAA();
      setBlogs(blogs);
    })();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      console.log("logging in with", username, password);

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

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

  const mapBlogs = blogs
    ? blogs.map((blog) => <Blog key={blog.id} blog={blog} />)
    : "loading...";

  return (
    <div>
      {user === null ? (
        loginForm()
      ) : (
        <Fragment>
          <h2>Blogs</h2>
          <p>{user.name} logged-in</p>
          {mapBlogs}
        </Fragment>
      )}
    </div>
  );
};

export default App;
