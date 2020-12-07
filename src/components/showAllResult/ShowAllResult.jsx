import React from "react";

function ShowAllResult({ toggleChecked }) {
  return (
    <div>
      show all results
      <input
        type="checkbox"
        onClick={toggleChecked}
        name=""
        id="show-all-results"
      />
    </div>
  );
}

export default ShowAllResult;
