import React, { useState } from "react";
import PropTypes from "prop-types";
import blogService from "../services/blogs";
import userService from "../services/users";
import BlogFormInputs from "./BlogFormInputs";

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
      <BlogFormInputs
        submitNewBlog={submitNewBlog}
        handleNewBlogChange={handleNewBlogChange}
        newBlog={newBlog}
      />
    </div>
  );
};

BlogForm.propTypes = {
  setBlogs: PropTypes.func.isRequired,
  setMsgBlock: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
};

export default BlogForm;
