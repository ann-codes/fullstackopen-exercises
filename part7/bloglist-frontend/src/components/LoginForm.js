import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import blogService from "../services/blogs";
import loginService from "../services/login";

import { setMsgBlock, RED_MSG } from "../reducers/msgBlockReducer";

const LoginForm = ({ setUser }) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
    } catch (ex) {
      // setMsgBlock({ css: "warning fade-out", msg: ex.response.data.error });
      dispatch(setMsgBlock(ex.response.data.error, RED_MSG, 3));
      // getting error message from json set in controller here ^^
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username:
          <input
            type="text"
            name="Username"
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password:
          <input
            type="password"
            name="Password"
            id="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" className="btn-submit">
          Login
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default LoginForm;
