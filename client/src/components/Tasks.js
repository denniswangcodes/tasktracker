import React from 'react';
import Task from './Task.js'


export default function Tasks({ tasks }) {

  return (
    <>
      {tasks.map((task) => (
        <Task task={task} />
      ))}
    </>
  )
}
