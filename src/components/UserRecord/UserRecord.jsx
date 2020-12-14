import React, { useState } from 'react'
import Recorder from 'recorder-js'

const UserRecord = ({ checkRecordSize }) => {
  const [isRecording, setIsRecording] = useState(false)
  const [recordURL, setRecordURL] = useState(null)
  const [message, setMessage] = useState(null)

  const audioContext = new (window.AudioContext || window.webkitAudioContext)()

  const recorder = new Recorder(audioContext, {
    // An array of 255 Numbers
    // You can use this to visualize the audio stream
    // If you use react, check out react-wave-stream
  })

  navigator.mediaDevices
    .getUserMedia({ audio: true, channelCount: 1, echoCancellation: true })
    .then((stream) => recorder.init(stream))
    .catch((err) => console.log('Uh oh... unable to get stream...', err))

  function startRecording() {
    setMessage('Recording...')
    recorder.start().then(() => setIsRecording(true))
    setTimeout(function () {
      stopRecording()
    }, 2500)
  }

  function stopRecording() {
    recorder.stop().then(({ blob, buffer }) => {
      setMessage(null)
      setIsRecording(false)
      blob.name = 'record.wav'
      blob.lastModified = new Date().getTime()
      blob.lastModifiedDate = new Date()
      blob.webkitRelativePath = ''
      setRecordURL(URL.createObjectURL(blob))
      checkRecordSize(blob)

      // buffer is an AudioBuffer
    })
  }

  // function download() {
  //   Recorder.download(blob, 'my-record') // downloads a .wav file
  // }

  return (
    <>
      <button className='button' onClick={startRecording}>
        <i class='fas fa-microphone'></i>
      </button>
      {message ? <h5 className='ml-1'> {message} </h5> : null}
    </>
  )
}

export default UserRecord
