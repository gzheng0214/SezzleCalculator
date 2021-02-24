import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Button from "./Button";
import Display from "./Display";
import Results from "./Results";

const socket = io.connect("http://localhost:4000");

const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [results, setResults] = useState([]);

  // GET DATA FROM LOCAL STORAGE ON LOAD
  useEffect(() => {
    if (localStorage.getItem("results") !== null) {
      const localData = JSON.parse(localStorage.getItem("results"));
      setResults(localData);
    }
  }, []);

  // STORE RESULTS IN LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("results", JSON.stringify(results));
  }, [results]);

  useEffect(() => {
    // RESULT FROM SOCKETIO IS PUT INTO RESULTS ARRAY
    socket.on("result", ({ expression, answer }) => {
      if (results.length < 10) {
        setResults([...results, [expression, answer]]);
      } else {
        setResults([...results.slice(1, 10), [expression, answer]]);
      }
    });
  });

  // HANDLE CALCULATIONS
  const calculate = () => {
    let answer = "";
    // PREVENT CALCULATION FROM HAPPENING IF EXPRESSION ENDS WITH AN OPERATION
    if (["*", "+", "/", "-"].indexOf(expression[expression.length - 1]) < 0) {
      try {
        answer = String(eval(expression));
        setResult(answer);
      } catch (e) {
        answer = "error";
        setResult("Error");
      }
      // SENDING DATA TO SOCKETIO
      socket.emit("result", { expression, answer });
    }
  };

  // HANDLE GENERATING EXPRESSION
  const buttonHandler = (e) => {
    if (!e.target.closest("button")) return;
    const button = e.target.dataset.char;
    switch (button) {
      case "AC":
        setExpression("");
        setResult("");
        break;
      case "C":
        setExpression(expression.slice(0, -1));
        setResult("");
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
            if (expression.length > 1) {
              setExpression(expression.slice(0, -1) + button);
            } else if (lastChar !== "-") {
              setExpression(expression.slice(0, -1) + button);
            }
          } else if (button === "0") {
            // CHECK FOR DUPLICATE ZEROES BEFORE DECIMAL
            if (lastNumber !== "0") {
              setExpression(expression + button);
            } else {
              setExpression(expression.slice(0, -1) + button);
            }
          } // CHECK FOR DUPLICATE DECIMAL
          else if (!(button === "." && lastNumber.includes("."))) {
            // CHECK STRUCTURE OF EXPRESSION
            if (
              lastNumber === "0" &&
              ["*", "+", "/", "-"].indexOf(button) < 0 &&
              button !== "."
            ) {
              setExpression(expression.slice(0, -1) + button);
            } else {
              setExpression(expression + button);
            }
          }
        } else {
          if (!isNaN(button) || button === "." || button === "-") {
            setExpression(expression + button);
          }
        }
        setResult("");
    }
  };

  return (
    <>
      <div className="calculator">
        <Display result={result} expression={expression} />
        <div className="calculator__container" onClick={buttonHandler}>
          <Button
            dataChar="AC"
            text="AC"
            style={{ gridColumn: "1 / span 2" }}
          />
          <Button dataChar="C" text="C" />
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
      <Results results={results} />
      <button className="clearBtn" onClick={() => setResults([])}>
        Clear Results
      </button>
    </>
  );
};

export default Calculator;
