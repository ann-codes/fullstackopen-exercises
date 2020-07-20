import React, { Fragment } from "react";
import Part from "./Part";

// part 1.2
const Content = (props) => {

  // part 1.4
  const mappedParts = props.parts.map((part, i) => <Part key={i} part={part} />)

  return (
    <Fragment>
      {mappedParts}
    </Fragment>
  );
};

export default Content;
