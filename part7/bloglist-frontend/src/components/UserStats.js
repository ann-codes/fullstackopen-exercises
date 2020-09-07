import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { findOneUserById } from "../reducers/findUserReducer";

import { Paper } from "@material-ui/core";

const UserStats = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.oneUser);
  const id = useParams().id;

  useEffect(() => {
    dispatch(findOneUserById(id));
  }, [dispatch, id]);

  if (!user) {
    return <p>Searching for user...</p>;
  } else if (!user.blogs) {
    return <p>Searching for user...</p>;
  }

  const mapBlogs = user.blogs.map((b) => <li key={b.id}>{b.title}</li>);
  const noneFound = <li>{user.name} has not submitted any blog links. </li>;

  return (
    <>
      <h2>[ {user.name}'s Blog Links ]</h2>
      <Paper>
        <div className="paper-pad">
          <ul>{mapBlogs.length > 0 ? mapBlogs : noneFound}</ul>
        </div>
      </Paper>
    </>
  );
};

export default UserStats;
