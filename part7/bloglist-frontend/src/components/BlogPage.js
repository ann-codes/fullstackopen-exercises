import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import Likes from "./Likes";

import { setMsgBlock, BLUE_MSG, RED_MSG } from "../reducers/msgBlockReducer";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";
import { findOneBlogById } from "../reducers/findBlogReducer";

const BlogPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const blog = useSelector((state) => state.oneBlog);
  const history = useHistory();
  const id = useParams().id;
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    dispatch(findOneBlogById(id));
    setLikes(blog.likes);
  }, [dispatch, id, blog.likes]);

  if (!blog) {
    return <p>Searching for blog...</p>;
  } else if (!blog.user) {
    return <p>Searching for blog...</p>;
  }

  const addLike = async () => {
    try {
      setLikes(likes + 1);
      const payload = { ...blog, likes: likes + 1 };
      dispatch(likeBlog(blog.id, payload));
    } catch (ex) {
      dispatch(setMsgBlock(ex.response.data.error, RED_MSG, 3));
    }
  };

  const deleteBlogConfirm = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog link?"
    );
    if (confirmDelete) {
      try {
        await dispatch(deleteBlog(blog.id, user.token));
        dispatch(setMsgBlock("BLOG DELETED", BLUE_MSG, 3));
        history.push("/blog-links");
        history.go(); // reload and rerender has delay...
      } catch (ex) {
        dispatch(setMsgBlock(ex.response.data.error, RED_MSG, 3));
      }
    } else {
      dispatch(setMsgBlock("delete request cancelled", BLUE_MSG, 3));
    }
  };

  return (
    <div>
      <h2 className="bold-med">
        {blog.title} by {blog.author}{" "}
      </h2>
      <ul>
        <li>
          <a href={blog.url} target="_blank" rel="noopener noreferrer">
            {blog.url}
          </a>
        </li>
        <Likes likes={likes} addLike={addLike} />
        <li>Posted by {blog.user.name}</li>
      </ul>
      {blog.user.username === user.username && (
        <button onClick={() => deleteBlogConfirm()}>Delete</button>
      )}
    </div>
  );
};

export default BlogPage;
