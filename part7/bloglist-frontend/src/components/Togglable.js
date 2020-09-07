import React, { useState, useImperativeHandle } from "react";

import { Button, Paper } from "@material-ui/core";
import { Add } from "@material-ui/icons";

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
    <Paper>
      <div className="add-blog-form">
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={toggleVisibility}
          startIcon={<Add />}
        >
          {visible ? props.LabelOff : props.LabelOn}
        </Button>
        <div style={{ display: visible ? "" : "none" }}>{props.children}</div>
      </div>
    </Paper>
  );
});

Togglable.displayName = "Togglable";

export default Togglable;
