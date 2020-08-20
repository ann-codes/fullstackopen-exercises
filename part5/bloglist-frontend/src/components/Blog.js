import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, setMsgBlock }) => {
  const [vis, setVis] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const addLike = async () => {
    try {
      const payload = { ...blog, likes: likes + 1 };
      await blogService.update(blog.id, payload);
      setLikes(likes + 1);
    } catch (ex) {
      setMsgBlock({ css: "warning fade-out", msg: ex.response.data.error });
    }
  };

  return (
    <div className="blog-box">
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
        <button>Delete</button>
      </div>
    </div>
  );
};

export default Blog;
