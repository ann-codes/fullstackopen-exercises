export const NOTIFY = "NOTIFY";
export const HIDE_NOTE = "HIDE_NOTE";

const notificationReducer = (
  state = { content: "", display: "none" },
  action
) => {
  switch (action.type) {
    case NOTIFY:
      return { content: action.data.content, display: "block" };
    case HIDE_NOTE:
      return { display: "none" };
    default:
      return state;
  }
};

let timeout;
export const setNotification = (content, time) => async (dispatch) => {
  clearTimeout(timeout);
  dispatch({ type: NOTIFY, data: { content } });
  timeout = setTimeout(() => {
    dispatch(hideNotification());
  }, 1000 * time);
};

export const hideNotification = () => {
  return { type: HIDE_NOTE };
};

export default notificationReducer;
