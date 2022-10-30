import { useState, useEffect } from 'react';
import Header from './components/Header.js'
import Tasks from './components/Tasks.js'
import AddTask from './components/AddTask.js'

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }
    getTasks();
  }, [])

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();
    return data;
  }

  const addTask = async (task) => {
    const res = await fetch(`http://localhost:5000/tasks/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask]);

    const newTask = await res.json();
    setTasks([...tasks, newTask]);
  }

  const deleteTask =  async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task))
  }

  return (
    <div className='container'>
      <Header title={'Task Tracker'} addButtonClick={() => setShowAddTask(!showAddTask)} showAddTask={showAddTask} />
      {showAddTask && <AddTask addTask={addTask} />}
      {tasks.length > 0 ? <Tasks tasks={tasks} deleteTask={deleteTask} toggleReminder={toggleReminder} /> : 'No Tasks To Show'}
    </div>
  );
}

export default App;
