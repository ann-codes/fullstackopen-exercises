import React, { Fragment } from "react";

const MessageBlock = (props) => {
  let message = <div className={props.msgBlock.css}>{props.msgBlock.msg}</div>;

  setTimeout(() => props.setter({ css: "", msg: "" }), 6000);

  return <Fragment>{message}</Fragment>;
};

export default MessageBlock;
