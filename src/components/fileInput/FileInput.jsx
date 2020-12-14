import React from 'react'
import './FileInput.css'

function FileInput({ checkFileSize }) {
  return (
    <>
      <input
        className='input-file'
        type='file'
        name='wav'
        id='file'
        accept='.wav'
        required
        multiple
        onChange={checkFileSize}
      />
      <label for='file'>Choose files</label>
    </>
  )
}

export default FileInput
