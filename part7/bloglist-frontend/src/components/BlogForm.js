import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import blogService from "../services/blogs";
import userService from "../services/users";
import BlogFormInputs from "./BlogFormInputs";

import { setMsgBlock, GREEN_MSG, RED_MSG } from "../reducers/msgBlockReducer";
import { createBlog } from "../reducers/blogReducer";

const BlogForm = ({ user }) => {
  const dispatch = useDispatch();

  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

  const submitNewBlog = async (e) => {
    e.preventDefault();
    const payload = { ...newBlog };
    try {
      const userId = await userService.findByUsername(user.username);
      payload.userId = userId.id;
      // const created = await blogService.create(payload);
      dispatch(createBlog(payload));
      // if (created) {
      // setBlogs(blogs.concat({ ...created, user: userId }));
      setNewBlog({ title: "", author: "", url: "" });
      // setMsgBlock({ css: "success fade-out", msg: "new blog added!" });
      dispatch(setMsgBlock("new blog added!", GREEN_MSG, 3));
      // }
    } catch (ex) {
      // setMsgBlock({
      //   css: "warning fade-out",
      //   msg: ex.response ? ex.response.data.error : "400 Unknown Error",
      // });
      dispatch(
        setMsgBlock(
          ex.response ? ex.response.data.error : "400 Unknown Error",
          RED_MSG,
          3
        )
      );
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

export default BlogForm;
