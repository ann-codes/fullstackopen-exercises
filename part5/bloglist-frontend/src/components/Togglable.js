import React, { useState } from "react";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <button onClick={toggleVisibility}>
        {visible ? props.buttonLabelOff : props.buttonLabelOn}
      </button>
      <div style={{ display: visible ? "" : "none" }}>{props.children}</div>
      <button>Delete</button>
    </div>
  );
};

export default Togglable;
