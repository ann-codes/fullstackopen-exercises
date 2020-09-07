import React from "react";

import { Button, TextField, InputAdornment } from "@material-ui/core";
import { Publish, Lock as LockIcon } from "@material-ui/icons";

const BlogFormInputs = ({ submitNewBlog, handleNewBlogChange, newBlog }) => {
  return (
    <form onSubmit={submitNewBlog}>
      <div>
        <TextField
          type="text"
          value={newBlog.title}
          name="title"
          id="title"
          onChange={handleNewBlogChange}
          label="Blog Title:"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
          margin="normal"
          fullWidth
        />
      </div>
      <div>
        <TextField
          type="text"
          value={newBlog.author}
          name="author"
          id="author"
          onChange={handleNewBlogChange}
          label="Author(s):"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
          margin="normal"
          fullWidth
        />
      </div>
      <div>
        <TextField
          type="url"
          value={newBlog.url}
          name="url"
          id="url"
          onChange={handleNewBlogChange}
          placeholder="https://example.com"
          pattern="https://.*|http://.*"
          label="Url (start with http:// or https://):"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
          margin="normal"
          fullWidth
        />
      </div>
      <Button
        variant="contained"
        color="secondary"
        type="submit"
        startIcon={<Publish />}
      >
        Add blog
      </Button>
    </form>
  );
};

export default BlogFormInputs;
