import React from 'react'
import './FileInput.css'

function FileInput({ addFile }) {
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
        onChange={addFile}
      />
      <label for='file'>Choose files</label>
    </>
  )
}

export default FileInput
