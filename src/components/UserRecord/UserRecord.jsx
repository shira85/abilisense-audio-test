import React from 'react'
import Recorder from 'recorder-js'

const UserRecord = ({ checkRecordSize }) => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)()

  const recorder = new Recorder(audioContext, {
    // An array of 255 Numbers
    // You can use this to visualize the audio stream
    // If you use react, check out react-wave-stream
  })

  let isRecording = false
  let blob = null

  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => recorder.init(stream))
    .catch((err) => console.log('Uh oh... unable to get stream...', err))

  function startRecording() {
    recorder.start().then(() => (isRecording = true))
  }

  function stopRecording() {
    recorder.stop().then(({ blob, buffer }) => {
      blob = blob
      blob.name = 'record.wav'
      checkRecordSize(blob)

      // buffer is an AudioBuffer
    })
  }

  function download() {
    Recorder.download(blob, 'my-record') // downloads a .wav file
  }

  return (
    <div>
      <button onClick={startRecording}>start</button>
      <button onClick={stopRecording}>stop</button>
    </div>
  )
}

export default UserRecord
