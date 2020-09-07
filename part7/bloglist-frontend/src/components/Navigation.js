import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../reducers/loginReducer";

import { Button } from "@material-ui/core";
import { ListAlt, Equalizer, AccountBox, ExitToApp } from "@material-ui/icons";

const Navigation = ({ user, usersList }) => {
  const dispatch = useDispatch();
  const id = usersList.find((u) => u.name === user.name);

  if (!id) {
    return <p>Loading...</p>;
  }

  return (
    <nav>
      <Link to="/blog-links">
        <Button
          variant="outlined"
          color="secondary"
          size="large"
          startIcon={<ListAlt />}
        >
          Blog Links
        </Button>
      </Link>{" "}
      <Link to="/users">
        <Button
          variant="outlined"
          color="secondary"
          size="large"
          startIcon={<Equalizer />}
        >
          User Stats
        </Button>
      </Link>{" "}
      <Link to={`/user/${id.id}`}>
        <Button
          variant="outlined"
          color="secondary"
          size="large"
          startIcon={<AccountBox />}
        >
          {user.name}'s Account
        </Button>
      </Link>{" "}
      <Button
        variant="outlined"
        color="secondary"
        size="large"
        onClick={() => dispatch(logoutUser())}
        startIcon={<ExitToApp />}
      >
        Logout
      </Button>
    </nav>
  );
};

export default Navigation;
