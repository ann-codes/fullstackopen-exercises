import React from "react";

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.buttonName}</button>;
};

export default Button;
