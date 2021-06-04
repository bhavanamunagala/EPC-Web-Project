import React from "react";

const ErrorText = (props) => (
  <div className="err-msg" style={{ color: "#ea5455" }}>
    {props.text ? props.text : "This field is required"}
  </div>
);

export default ErrorText;
