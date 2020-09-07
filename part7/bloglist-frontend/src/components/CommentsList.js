import React from "react";
import { Paper } from "@material-ui/core";

const CommentsList = ({ commentsList }) => {
  return (
    <>
      <h2>Comments</h2>
      <Paper>
        <div className="paper-pad">
          <ul>
            {commentsList.map((c, i) => (
              <li key={`${i}-comment`}>{c}</li>
            ))}
          </ul>
        </div>
      </Paper>
    </>
  );
};

export default CommentsList;
