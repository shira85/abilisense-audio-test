import React from "react";
import './FetchButton.css'

function FetchButton({ onButtonSubmit }) {
  return (
    <button className="start-btn" onClick={onButtonSubmit}>
      Start
    </button>
  );
}

export default FetchButton;
