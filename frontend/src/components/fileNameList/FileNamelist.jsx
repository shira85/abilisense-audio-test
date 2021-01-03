import React from 'react'

function FileNameList({ fileList }) {
  return (
    <>
      {fileList.map((file, idx) => {
        return (
          <tr key={idx}>
            <td>{idx + 1}.</td>
            <td>{file.name}</td>
            <td> {file.result ? file.result[0] : null} </td>
          </tr>
        )
      })}
    </>
  )
}

export default FileNameList
