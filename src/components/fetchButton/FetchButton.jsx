import React from "react";

function FetchButton({ onButtonSubmit }) {
  return (
    <button className="start-btn" onClick={onButtonSubmit}>
      Start
    </button>
  );
}

export default FetchButton;
