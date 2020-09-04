import React from "react";
import Blog from "./Blog";
import { useSelector } from "react-redux";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const blogsList = blogs
    ? blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => <Blog key={blog.id} blog={blog} user={user} />)
    : "loading...";

  return blogsList.length > 0 ? blogsList : "No blog links!";
};

export default BlogList;
