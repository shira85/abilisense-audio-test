import React, { useState } from 'react'
import SingleFileData from '../SingleFileData/SingleFileData'

function FileNameList({ fileList }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioDuration, setAudioDuration] = useState(2500)

  const playSound = (audio) => {
    setAudioDuration(audio.duration * 1000)
    setIsPlaying(true)
    audio.play()
    setInterval(() => {
      setIsPlaying(false)
    }, audio.duration * 1000)
  }

  return (
    <>
      {fileList.map((file, idx) => {
        const audio = new Audio(file.blobURL)

        return (
          // <tr key={idx}>
          //   <td>{idx + 1}.</td>
          //   <td>{file.name}</td>
          //   <td>
          //     <a onClick={() => playSound(audio)}>
          //       <i
          //         className={` ${!isPlaying ? 'fas fa-play' : 'fas fa-pause'}`}
          //       ></i>
          //     </a>
          //   </td>
          //   <td> {file.result ? file.result[0] : null} </td>
          // </tr>
          <SingleFileData
            key={idx}
            name={file.name}
            idx={idx}
            result={file.result}
            file={file}
          />
        )
      })}
    </>
  )
}

export default FileNameList
