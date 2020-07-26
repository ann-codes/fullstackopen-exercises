import React from "react";

const InputField = (props) => {
  return (
    <p>
      {props.title}:{" "}
      <input
        name={props.inputName}
        value={props.inputValue}
        onChange={props.handleChange}
      />
    </p>
  );
};

export default InputField;
