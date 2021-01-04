import React from 'react'
import './FetchButton.css'

function FetchButton({ onButtonSubmit }) {
  return (
    <button className='button' onClick={onButtonSubmit}>
      Start
    </button>
  )
}

export default FetchButton
