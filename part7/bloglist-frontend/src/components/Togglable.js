import React, { useState, useImperativeHandle } from "react";

// useRef hooks example not used due to structure of components
const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      <button onClick={toggleVisibility}>
        {visible ? props.LabelOff : props.LabelOn}
      </button>
      <div style={{ display: visible ? "" : "none" }}>{props.children}</div>
    </div>
  );
});

Togglable.displayName = "Togglable";

export default Togglable;
