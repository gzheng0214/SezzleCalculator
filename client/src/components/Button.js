import React from "react";

const Button = (props) => {
  return (
    <button style={props.style} data-char={props.dataChar}>
      {props.text}
    </button>
  );
};

export default Button;
