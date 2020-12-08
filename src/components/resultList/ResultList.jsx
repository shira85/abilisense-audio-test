import React from "react";

function ResultList({ resultList, toggleResult }) {
  return (
    <td>
      {resultList.map((sounds) => {
        if (toggleResult) {
          return (
            <tr>
              {sounds.map((sound) => {
                return sound[0] + "\n";
              })}
            </tr>
          );
        } else {
          return <tr>{sounds[0]}</tr>;
        }
      })}
    </td>
  );
}

export default ResultList;
