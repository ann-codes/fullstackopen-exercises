import React from "react";

const BlogForm = ({
  submitNewBlog,
  newBlog,
  handleChange
}) => {
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
            onChange={handleChange}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={newBlog.author}
            name="author"
            onChange={handleChange}
          />
        </div>
        <div>
          Url:
          <input
            type="text"
            value={newBlog.url}
            name="url"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add blog</button>
      </form>
    </div>
  );
};
export default BlogForm;
