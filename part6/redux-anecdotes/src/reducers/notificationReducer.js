export const NOTIFY = "NOTIFY";
export const HIDE_NOTE = "HIDE_NOTE";

const notificationReducer = (
  state = { content: "", display: "none" },
  action
) => {
  //   console.log("notification state now: ", state);
  //   console.log("notification action", action);

  switch (action.type) {
    case NOTIFY:
      return { content: action.data.content, display: "block" };
    case HIDE_NOTE:
      return { display: "none" };
    default:
      return state;
  }
};

export const notify = (content) => {
  //   let timeout;
  //   return (dispatch) => {
  //     // crashing b/c async function so needs middleware (next section?)
  //     clearTimeout(timeout);
  //     dispatch({ type: "NOTIFY", data: { content } });
  //     timeout = setTimeout(() => {
  //       dispatch(hideNotification());
  //     }, 5000);
  //   };

  return { type: NOTIFY, data: { content, display: "inline" } };
};

export const hideNotification = () => {
  return { type: HIDE_NOTE };
};

export default notificationReducer;
