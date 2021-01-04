import React, { useState } from 'react'

const SingleFileData = ({ idx, name, audio, audioDuration, result, file }) => {
  const [isPlaying, setIsPlaying] = useState(false)

  const audioTest = new Audio(file.name)

  const playSound = () => {
    console.log(audioDuration)

    setIsPlaying(true)
    audio.play()
    setTimeout(() => {
      setIsPlaying(false)
    }, audioDuration)
  }
  return (
    <tr key={idx}>
      <td>{idx + 1}.</td>
      <td>{name}</td>
      <td>
        {/* <a onClick={playSound}>
          <i className={` ${!isPlaying ? 'fas fa-play' : 'fas fa-pause'}`}></i>
        </a> */}
        <audio controls src={file.blobURL}></audio>
      </td>
      <td> {result ? result[0] : null} </td>
    </tr>
  )
}

export default SingleFileData
