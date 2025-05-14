// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);
  const [count,setCount]=useState(0);
  const couter1=()=>{
    setCount(count+1);
  }
  // const [decount,setDecount]=useState(1);
  const decounter=()=>{
    setCount(count-1);
  }

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (input.trim()) {
      const newTasks = [...tasks, { text: input, completed: false }];
      setTasks(newTasks);
      setInput('');
    }
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">React To-Do List 📝</h2>
        {/* <h5>
  <span style={{ backgroundColor: "black", color: "white", display: "inline" }}>
    No of functions left: {count}
  </span>
</h5> */}

        <h5 style={{display: "inline", justifyContent:"left",backgroundColor:"black",color:"white"}}>No of fuctions left: {count}</h5>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter a task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="btn btn-primary" onClick={()=>{handleAddTask(); couter1(); }}>Add</button>
      </div>

      <ul className="list-group">
        {tasks.length === 0 ? (
          <li className="list-group-item text-muted">No tasks yet</li>
        ) : (
          tasks.map((task, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
              }}
            >
              <span onClick={() => toggleTask(index)} style={{ cursor: 'pointer' }}>
                {task.text}
              </span>
              <button
                className="btn btn-sm btn-danger"
                onClick={() =>{ deleteTask(index); decounter();}}
              >
                ❌
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;