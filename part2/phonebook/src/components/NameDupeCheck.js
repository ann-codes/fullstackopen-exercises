import React from "react";

const NameDupeCheck = ({ isDupe, nameToCheck }) => {
  return (
    <p>
      {isDupe
        ? `${nameToCheck} is a Duplicate! Try again!`
        : "Add a Name and Number:"}
    </p>
  );
};

export default NameDupeCheck;
