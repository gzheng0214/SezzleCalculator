import React from "react";
import Button from "./Button";
import Display from "./Display";

const Calculator = () => {
  return (
    <div className="calculator">
      <Display />
      <div className="calculator__container">
        <Button text="AC" style={{ gridColumn: "1 / span 3" }} />
        <Button text="&divide;" />
        <Button text="7" />
        <Button text="8" />
        <Button text="9" />
        <Button text="&times;" />
        <Button text="4" />
        <Button text="5" />
        <Button text="6" />
        <Button text="&minus;" />
        <Button text="1" />
        <Button text="2" />
        <Button text="3" />
        <Button text="&#43;" />
        <Button text="0" style={{ gridColumn: "1 / span 2" }} />
        <Button text="." />
        <Button text="=" />
      </div>
    </div>
  );
};

export default Calculator;
