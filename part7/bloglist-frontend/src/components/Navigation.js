import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../reducers/loginReducer";

const Navigation = ({ user }) => {
  const dispatch = useDispatch();

  return (
    <nav>
      [<Link to="/blog-links">Blog Links</Link>] [<Link to="/users">User Stats</Link>
      ] {user.name} is logged in{" "}
      <button onClick={() => dispatch(logoutUser())}>Logout</button>
    </nav>
  );
};

export default Navigation;
