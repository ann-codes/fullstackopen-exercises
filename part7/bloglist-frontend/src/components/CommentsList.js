import React from "react";

const CommentsList = ({ commentsList }) => {
  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {commentsList.map((c, i) => (
          <li key={`${i}-comment`}>{c}</li>
        ))}
      </ul>
    </div>
  );
};

export default CommentsList;
