import React, { Fragment } from "react";
import { useSelector } from "react-redux";

const MessageBlock = () => {
  const msg = useSelector((state) => state.msgBlock);
  let message = <div className={msg.css}>{msg.msg}</div>;

  return <Fragment>{message}</Fragment>;
};

export default MessageBlock;
