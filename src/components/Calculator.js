import React, { useState } from "react";
import Button from "./Button";
import Display from "./Display";

const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");

  const clear = () => {
    setExpression("");
    setResult("");
  };

  const calculate = () => {
    setResult(String(eval(expression)));
  };

  const buttonHandler = (e) => {
    if (!e.target.closest("button")) return;
    const button = e.target.dataset.char;
    switch (button) {
      case "AC":
        clear();
        break;
      case "=":
        if (expression.length > 0) {
          calculate();
        }
        break;
      default:
        const lastChar = expression[expression.length - 1];
        const numbers = expression.split(/\+|-|\*|\//);
        const lastNumber = numbers[numbers.length - 1];
        if (expression.length > 0) {
          // CHECK FOR DUPLICATE OPERATIONS
          if (
            ["*", "+", "/", "-"].indexOf(lastChar) >= 0 &&
            ["*", "+", "/", "-"].indexOf(button) >= 0
          ) {
            setExpression(expression.slice(0, -1) + button);
          } else if (!(button === "." && lastNumber.includes("."))) {
            // CHECK FOR DUPLICATE DECIMAL
            setExpression(expression + button);
          }
        } else {
          if (!isNaN(button) || button === ".") {
            setExpression(expression + button);
          }
        }
        setResult("");
    }
  };

  return (
    <div className="calculator">
      <Display result={result} expression={expression} />
      <div className="calculator__container" onClick={buttonHandler}>
        <Button dataChar="AC" text="AC" style={{ gridColumn: "1 / span 3" }} />
        <Button dataChar="/" text="&divide;" />
        <Button dataChar="7" text="7" />
        <Button dataChar="8" text="8" />
        <Button dataChar="9" text="9" />
        <Button dataChar="*" text="&times;" />
        <Button dataChar="4" text="4" />
        <Button dataChar="5" text="5" />
        <Button dataChar="6" text="6" />
        <Button dataChar="-" text="&minus;" />
        <Button dataChar="1" text="1" />
        <Button dataChar="2" text="2" />
        <Button dataChar="3" text="3" />
        <Button dataChar="+" text="&#43;" />
        <Button dataChar="0" text="0" style={{ gridColumn: "1 / span 2" }} />
        <Button dataChar="." text="." />
        <Button dataChar="=" text="=" />
      </div>
    </div>
  );
};

export default Calculator;
