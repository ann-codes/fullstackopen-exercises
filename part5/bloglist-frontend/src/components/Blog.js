import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, setMsgBlock, user }) => {
  const [vis, setVis] = useState(false);
  const [likes, setLikes] = useState(blog.likes);
  const [notDeleted, setNotDeleted] = useState(true); 
  // using display: none to hide the deleted though html is still there
  // alt way: pass blogs and setBlogs prop and remove deleted blog via filter 

  const addLike = async () => {
    try {
      const payload = { ...blog, likes: likes + 1 };
      await blogService.update(blog.id, payload);
      setLikes(likes + 1);
    } catch (ex) {
      setMsgBlock({ css: "warning fade-out", msg: ex.response.data.error });
    }
  };

  const deleteBlog = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog link?"
    );
    if (confirmDelete) {
      try {
        await blogService.deleteBlog(blog.id, user.token);
        setMsgBlock({ css: "notice fade-out", msg: "BLOG DELETED" });
        setNotDeleted(false);
      } catch (ex) {
        console.log(ex.response.data.error);
        setMsgBlock({ css: "warning fade-out", msg: ex.response.data.error });
      }
    } else {
      setMsgBlock({ css: "notice fade-out", msg: "delete request cancelled" });
    }
  };

  return (
    <div className="blog-box" style={{ display: notDeleted ? "" : "none" }}>
      {blog.title} by {blog.author}{" "}
      <button onClick={() => setVis(!vis)}>{vis ? "hide" : "view"}</button>
      <div style={{ display: vis ? "" : "none" }}>
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </a>
        <br />
        Likes: {likes} <button onClick={() => addLike()}>+</button>
        <br />
        Posted by {blog.user.name}
        <br />
        <button onClick={() => deleteBlog()}>Delete</button>
      </div>
    </div>
  );
};

export default Blog;
