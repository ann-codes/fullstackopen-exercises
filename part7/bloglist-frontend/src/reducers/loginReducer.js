import loginSvs from "../services/login";
import blogSvs from "../services/blogs";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

const loginReducer = (
  state = { token: "", username: "", name: "" },
  action
) => {
  switch (action.type) {
    case LOGIN:
      return action.data;
    case LOGOUT:
      return { token: "", username: "", name: "" };
    default:
      return state;
  }
};

export const loginUser = (creds) => async (dispatch) => {
  const user = await loginSvs.login(creds);
  window.localStorage.setItem("bloglist-token", JSON.stringify(user));
  blogSvs.setToken(user.token);
  dispatch({ type: LOGIN, data: user });
};

export const logoutUser = () => async (dispatch) => {
  window.localStorage.removeItem("bloglist-token");
  await dispatch({ type: LOGOUT });
};

export const setUserByLocalStorage = () => async (dispatch) => {
  const loggedUserJSON = window.localStorage.getItem("bloglist-token");
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    blogSvs.setToken(user.token);
    dispatch({ type: LOGIN, data: user });
  }
};

export default loginReducer;
