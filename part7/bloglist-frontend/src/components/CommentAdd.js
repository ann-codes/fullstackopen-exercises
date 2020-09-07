import React from "react";

import { Button, TextField } from "@material-ui/core";
import { CreateRounded } from "@material-ui/icons";

const CommentAdd = ({ newComment, submitComment, setNewComment }) => {
  return (
    <div>
      <form onSubmit={submitComment}>
        <TextField
          type="text"
          name="newcomment"
          id="newcomment"
          value={newComment}
          onChange={({ target }) => setNewComment(target.value)}
          label="Your Comment:"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
          margin="normal"
          multiline
          rows={1}
          fullWidth
        />
        <div>
          <Button
            startIcon={<CreateRounded />}
            variant="contained"
            color="secondary"
            type="submit"
          >
            Add Comment
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CommentAdd;
