import React from "react";
import { useDispatch } from "react-redux";
import { filtering } from "../reducers/filterReducer";

const Filter = (props) => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    // console.log(e.target.value); //////
    dispatch(filtering(e.target.value));
  };

  const style = { marginBottom: 10 };

  return (
    <div style={style}>
      Filter by: <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
