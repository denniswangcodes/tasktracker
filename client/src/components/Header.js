import React from 'react'
import Button from './Button.js'
// import PropTypes from 'prop-types'

export default function Header({ title }) {
  const onClick = () => {
    alert('click!')
  }
  return (
    <header className='header'>
      <h1>{title}</h1>
      <Button color='green' text='Add' onClick={onClick} />
    </header>
  )
}

// Header.defaultProps = {
//   title: 'Task Tracker',
// }

// Header.propTypes = {
//   title: PropTypes.string.isRequired
// }

// const headingStyle = {
//   color: 'red',
//   backgroundColor: 'black'
// }