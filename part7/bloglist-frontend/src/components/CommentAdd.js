import React from "react";

const CommentAdd = ({ newComment, submitComment, setNewComment }) => {
  return (
    <div>
      <form onSubmit={submitComment}>
        <input
          type="text"
          name="newcomment"
          id="newcomment"
          value={newComment}
          onChange={({ target }) => setNewComment(target.value)}
        />
        <button type="submit" className="btn-submit">
          Add Comment
        </button>
      </form>
    </div>
  );
};

export default CommentAdd;
