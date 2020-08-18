import React, { Fragment } from "react";

const MessageBlock = (props) => {
  let message = <div className={props.msgBlock.css}>{props.msgBlock.msg}</div>;

  // } else if (messageType === "edited") {
  //   message = (
  //     <div className="notice fade-out">
  //       {props.name} was edited in the Phonebook.
  //     </div>
  //   );

  setTimeout(() => props.setter({ css: "", msg: "" }), 6000);

  return <Fragment>{message}</Fragment>;
};

export default MessageBlock;
