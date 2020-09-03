export const GREEN_MSG = "GREEN";
export const RED_MSG = "RED";
export const BLUE_MSG = "BLUE_MSG";
export const HIDE_MSG = "HIDE_MSG";

const msgBlockReducer = (state = { css: "", msg: "" }, action) => {
  switch (action.type) {
    case GREEN_MSG:
      return action.data.content;
    case RED_MSG:
      return action.data.content;
    case BLUE_MSG:
      return action.data.content;
    case HIDE_MSG:
      return { css: "", msg: "" };
    default:
      return state;
  }
};

let timeout;
export const setMsgBlock = (content, TYPE, seconds) => async (dispatch) => {
  clearTimeout(timeout);
  dispatch({ type: TYPE, data: { content } });
  timeout = setTimeout(() => {
    dispatch(hideMsgBlock());
  }, 1000 * seconds);
};

export const hideMsgBlock = () => {
  return { type: HIDE_MSG };
};

export default msgBlockReducer;
