import React, { Fragment } from "react";
import { useSelector } from "react-redux";

const MessageBlock = () => {
  const msg = useSelector((state) => state.msgBlock);

  console.log("MSG", msg);
  let message = <div className={msg.css}>{msg.msg}</div>;


  // let message = <div className={props.msgBlock.css}>{props.msgBlock.msg}</div>;
  // setTimeout(() => props.setter({ css: "", msg: "" }), 6000);
  return <Fragment>{message}</Fragment>;
};

export default MessageBlock;
