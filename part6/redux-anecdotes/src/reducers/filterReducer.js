export const FILTER = "FILTER";

const filterReducer = (state = "", action) => {
  switch (action.type) {
    case FILTER:
      return action.filter;
    default:
      return state;
  }
};

export const filtering = (filter) => {
  return {
    type: FILTER,
    filter,
  };
};

export default filterReducer;
