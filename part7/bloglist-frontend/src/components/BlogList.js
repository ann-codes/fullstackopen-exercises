import React from "react";
import Blog from "./Blog";
import { useSelector } from "react-redux";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const blogsList = blogs
    ? blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => <Blog key={blog.id} blog={blog} user={user} />)
    : "loading...";

  return (
    <>
      <h2>Blog Links</h2>
      <Togglable LabelOff="Cancel Add" LabelOn="Add New Blog">
        <BlogForm user={user} />
      </Togglable>
      {blogsList.length > 0 ? blogsList : "No blog links!"}
    </>
  );
};

export default BlogList;
