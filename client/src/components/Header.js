import React from 'react'
import Button from './Button.js'
import { useLocation } from 'react-router-dom';

// import PropTypes from 'prop-types'

export default function Header({ title, addButtonClick, showAddTask }) {
  const location = useLocation();

  return (
    <header className='header'>
      <h1>{title}</h1>
      {location.pathname === '/' && (<Button color={showAddTask ? 'red' : 'green'} text={showAddTask ? 'Close' : 'Add'} onClick={addButtonClick} />)}
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