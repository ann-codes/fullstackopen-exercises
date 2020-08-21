import React from "react";

const Likes = ({ likes, addLike }) => {
  return (
    <li>
      Likes: {likes} <button onClick={() => addLike()}>+</button>
    </li>
  );
};

export default Likes;
