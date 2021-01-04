import React from 'react'

function ResultList({ resultList, toggleResult }) {
  return (
    <td>
      {resultList.map((sounds) => {
        if (toggleResult) {
          return (
            <td>
              {sounds.map((sound) => {
                return sound[0]
              })}
            </td>
          )
        } else {
          return <tr>{sounds[0]}</tr>
        }
      })}
    </td>
  )
}

export default ResultList
