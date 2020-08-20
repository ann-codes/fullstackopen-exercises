import React, { useState } from "react";
// import blogService from "../services/blogs";

const Blog = ({ blog }) => {
  const [vis, setVis] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  // const addLike = () => {};

  return (
    <div className="blog-box">
      {blog.title} by {blog.author}{" "}
      <button onClick={() => setVis(!vis)}>{vis ? "hide" : "view"}</button>
      <div style={{ display: vis ? "" : "none" }}>
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </a>
        <br />
        Likes: {likes} <button onClick={() => setLikes(likes + 1)}>Like</button>
        <br />
        Posted by {blog.user.name}
        <br />
        <button>Delete</button>
      </div>
    </div>
  );
};

export default Blog;
