import React from "react";
import { connect } from "react-redux";
import { filtering } from "../reducers/filterReducer";

const Filter = (props) => {
  const handleChange = (e) => {
    props.filtering(e.target.value);
  };

  const style = { marginBottom: 10 };

  return (
    <div style={style}>
      Filter by: <input onChange={handleChange} />
    </div>
  );
};

export default connect(null, { filtering })(Filter);
