import React from "react";

const Display = (props) => {
  return (
    <div className="display">
      <div className="display__expression">{props.expression}</div>
      <div className="display__result">{props.result}</div>
    </div>
  );
};

export default Display;
