import React from "react";

const Results = (props) => {
  const renderResults = () => {
    return props.results
      .slice(0)
      .reverse()
      .map((result, index) => {
        return <li key={index}>{result[0] + "=" + result[1]}</li>;
      });
  };
  return (
    <div className="results">
      <h1>Results</h1>
      <ul>{renderResults()}</ul>
    </div>
  );
};

export default Results;
