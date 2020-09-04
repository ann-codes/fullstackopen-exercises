import userSvs from "../services/users";

export const INIT_USERS = "INIT_USERS";

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case INIT_USERS:
      return action.data;
    default:
      return state;
  }
};

export const initUsers = () => async (dispatch) => {
  const users = await userSvs.getAllUsers();
  dispatch({ type: INIT_USERS, data: users });
};

export default usersReducer;
