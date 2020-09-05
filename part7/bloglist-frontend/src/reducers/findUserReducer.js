import userSvs from "../services/users";

export const FIND_USER_BY_ID = "FIND_USER_BY_ID";

const findUserReducer = (state = {}, action) => {
  switch (action.type) {
    case FIND_USER_BY_ID:
      return action.data;
    default:
      return state;
  }
};

export const findOneUserById = (id) => async (dispatch) => {
  const user = await userSvs.findById(id);
  dispatch({ type: FIND_USER_BY_ID, data: user });
};

export default findUserReducer;
