import React, { Fragment } from "react";

const MessageBlock = (props) => {
  const { messageType } = props;
  let message = "";

  if (messageType === "added") {
    message = (
      <div className="success fade-out">
        {props.name} was added to the Phonebook.
      </div>
    );
  } else if (messageType === "edited") {
    message = (
      <div className="notice fade-out">
        {props.name} was edited in the Phonebook.
      </div>
    );
  } else if (messageType === "deleted") {
    message = (
      <div className="warning fade-out">
        {props.name} was deleted from the Phonebook
      </div>
    );
  } else if (messageType === "editError") {
    message = (
      <div className="warning fade-out">
        {props.name} is no longer in the Phonebook
      </div>
    );
  } else if (messageType === "validationError") {
    message = (
      <div className="warning fade-out">
        {props.name}
      </div>
    );
  }
  setTimeout(() => props.setMessageType(""), 5000);

  return <Fragment>{message}</Fragment>;
};

export default MessageBlock;
