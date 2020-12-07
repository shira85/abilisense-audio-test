import React from "react";

function FileNameList({ fileList }) {
  return (
    <td>
      {fileList.map((file, idx) => {
        return <tr>{file.name}</tr>;
      })}
    </td>
  );
}

export default FileNameList;
