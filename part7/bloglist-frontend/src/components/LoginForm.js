import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setMsgBlock, RED_MSG } from "../reducers/msgBlockReducer";
import { loginUser } from "../reducers/loginReducer";

import { Button, TextField, InputAdornment } from "@material-ui/core";
import { AccountCircle, Lock as LockIcon } from "@material-ui/icons";

const LoginForm = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ username, password }));
    } catch (ex) {
      dispatch(setMsgBlock(ex.response.data.error, RED_MSG, 3));
      // getting error message from json set in controller here ^^
    }
  };

  return (
    <div>
      <h2>[ Login ]</h2>
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            type="text"
            name="Username"
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            label="Username"
            InputLabelProps={{
              shrink: true,
            }}
            variant="filled"
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle color="secondary" />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </div>
        <div>
          <TextField
            type="password"
            name="Password"
            id="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            InputLabelProps={{
              shrink: true,
            }}
            variant="filled"
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="secondary" />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </div>
        <div>
          <Button variant="contained" color="secondary" type="submit">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
