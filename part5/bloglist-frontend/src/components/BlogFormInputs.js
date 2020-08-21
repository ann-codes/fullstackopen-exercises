import React from "react";

const BlogFormInputs = ({ submitNewBlog, handleNewBlogChange, newBlog }) => {
  return (
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
          id="author"
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
  );
};

export default BlogFormInputs;
