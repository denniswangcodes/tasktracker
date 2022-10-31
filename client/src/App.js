import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header.js'
import Tasks from './components/Tasks.js'
import AddTask from './components/AddTask.js'
import Footer from './components/Footer.js'
import About from './components/About.js'

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
    const tasks = await res.json();
    return tasks;
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const task = await res.json();
    return task;
  }

  const addTask = async (task) => {

    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask]);

    const res = await fetch(`http://localhost:5000/tasks/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const newTask = await res.json();
    setTasks([...tasks, newTask]);
  }

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updateTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
    const res = await fetch(
      `http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateTask)
    })

    console.log('After fetc')
    const updatedTask = await res.json();

    setTasks(
      tasks.map(
        (task) => task.id === id ? { ...task, reminder: updatedTask.reminder } : task
      )
    )
  }

  return (
    <Router>
      <div className='container'>
        <Header title={'Task Tracker'} addButtonClick={() => setShowAddTask(!showAddTask)} showAddTask={showAddTask} />
        <Routes>
          <Route path="/" exact element={
            <>
              {showAddTask && <AddTask addTask={addTask} />}
              {tasks.length > 0 ? <Tasks tasks={tasks} deleteTask={deleteTask} toggleReminder={toggleReminder} /> : 'No Tasks To Show'}
            </>} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
