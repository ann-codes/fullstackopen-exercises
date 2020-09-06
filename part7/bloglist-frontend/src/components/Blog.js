import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Likes from "./Likes";

import { setMsgBlock, BLUE_MSG, RED_MSG } from "../reducers/msgBlockReducer";
import { updateBlog, deleteBlog } from "../reducers/blogReducer";

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch();

  const [vis, setVis] = useState(false);
  const [likes, setLikes] = useState(blog.likes);
  const [notDeleted, setNotDeleted] = useState(true);
  // using display: none to hide the deleted though html is still there
  // alt way: pass blogs and setBlogs prop and remove deleted blog via filter

  const addLike = async () => {
    try {
      const payload = { ...blog, likes: likes + 1 };
      dispatch(updateBlog(blog.id, payload));
      setLikes(likes + 1);
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
        setNotDeleted(false);
      } catch (ex) {
        dispatch(setMsgBlock(ex.response.data.error, RED_MSG, 3));
      }
    } else {
      dispatch(setMsgBlock("delete request cancelled", BLUE_MSG, 3));
    }
  };

  return (
    <div className="blog-box" style={{ display: notDeleted ? "" : "none" }}>
      <span className="bold-med">
        <Link to={`/blog/${blog.id}`}>
          {blog.title} by {blog.author}
        </Link>{" "}
      </span>
      <button onClick={() => setVis(!vis)}>
        {vis ? "hide" : "quick view"}
      </button>
      <div className="blog-deets" style={{ display: vis ? "block" : "none" }}>
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
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default Blog;
