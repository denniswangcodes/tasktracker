import React from 'react'

export default function Button({ color, text, onClick }) {
  return (
    <div>
      <button className='btn' onClick={onClick}>{text}</button>
    </div>
  )
}