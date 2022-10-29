import React from 'react';


export default function Tasks({ tasks }) {


  return (
    <>
      {tasks.map((task) => (
        <h3>{task.text}</h3>
      ))}
    </>
  )
}
