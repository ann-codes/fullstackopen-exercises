import React, { useState } from "react";
const Blog = ({ blog }) => {
  const [vis, setVis] = useState(false);
  return (
    <div className="blog-box">
      {blog.title} by {blog.author}{" "}
      <button onClick={() => setVis(!vis)}>view</button>
      <div style={{ display: vis ? "" : "none" }}>
        <a href={blog.url} target="_blank">
          {blog.url}
        </a>
        <br />
        Likes: {blog.likes} <button>Like</button>
        <br />
        Posted by {blog.user.name}
      </div>
    </div>
  );
};

export default Blog;
