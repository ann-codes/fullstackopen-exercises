import React, { useState, useRef } from "react";
import blogService from "../services/blogs";
import userService from "../services/users";

const BlogForm = ({ blogs, user, setMsgBlock, setBlogs }) => {
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

  const submitNewBlog = async (e) => {
    e.preventDefault();
    const payload = { ...newBlog };
    try {
      const userId = await userService.findByUsername(user.username);
      payload.userId = userId.id;
      const created = await blogService.create(payload);
      if (created) {
        setBlogs(blogs.concat({ ...created, user: userId }));
        setNewBlog({ title: "", author: "", url: "" });
        setMsgBlock({ css: "success fade-out", msg: "new blog added!" });
      }
    } catch (ex) {
      setMsgBlock({
        css: "warning fade-out",
        msg: ex.response ? ex.response.data.error : "400 Unknown Error",
      });
    }
  };

  const handleNewBlogChange = (e) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Add New Blog</h2>
      <form onSubmit={submitNewBlog}>
        <div>
          Title:
          <input
            type="text"
            value={newBlog.title}
            name="title"
            onChange={handleNewBlogChange}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={newBlog.author}
            name="author"
            onChange={handleNewBlogChange}
          />
        </div>
        <div>
          Url:
          <input
            type="text"
            value={newBlog.url}
            name="url"
            onChange={handleNewBlogChange}
          />
        </div>
        <button type="submit">Add blog</button>
      </form>
    </div>
  );
};
export default BlogForm;
