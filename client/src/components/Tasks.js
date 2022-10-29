import React from 'react';
import Task from './Task.js'


export default function Tasks({ tasks, deleteTask, toggleReminder }) {

  return (
    <>
      {tasks.map((task) => (
        <Task key={task} task={task} deleteTask={deleteTask} toggleReminder={toggleReminder} />
      ))}
    </>
  )
}
