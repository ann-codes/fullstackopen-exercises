import React from "react";
import { connect } from "react-redux";

const Notification = (props) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    display: props.notification.display,
  };
  return <div style={style}>{props.notification.content}</div>;
};

const mapStateToProps = (state) => ({ notification: state.notification });

export default connect(mapStateToProps)(Notification);
