import React from "react";

const Stat = ({ text, value }) => {
  return (
    <tr>
      <td>{text}:</td> 
      <td>{value}</td>
    </tr>
  );
};

export default Stat;
