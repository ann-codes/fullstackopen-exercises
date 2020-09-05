import React, {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { findOneUserById } from "../reducers/findUserReducer";

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

  return (
    <>
      <h2>{user.name}'s blog links:</h2>
      <ul>{mapBlogs}</ul>
    </>
  );
};

export default UserStats;
