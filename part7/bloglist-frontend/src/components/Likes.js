import React from "react";
import { IconButton } from "@material-ui/core";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";

const Likes = ({ likes, addLike }) => {
  return (
    <li>
      <span>Total Lkes: {likes}</span>
      <IconButton
        aria-label="delete"
        size="small"
        color="secondary"
        onClick={() => addLike()}
      >
        <AddCircleRoundedIcon fontSize="inherit" />
      </IconButton>
    </li>
  );
};

export default Likes;
