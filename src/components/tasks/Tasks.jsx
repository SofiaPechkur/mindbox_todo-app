import { useState } from 'react'
import './Tasks.css'

const Tasks = () => {
  const [inputValue, setInputValue] = useState('');
  const [tasks, setTasks] = useState([]) // {id: Date.now(), text: "New task", completed: false}

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const newTask = {id: Date.now(), text: inputValue, completed: false};
    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  const handleClick = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task))
  }

  return (
    <>
      <section>
        <form  className="todo-list" onSubmit={handleSubmit}> 
          <div className='input-task flex'>
            <button
            type="submit"
            style={{ cursor: "pointer" }}>
            </button>
            <input 
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="What needs to be done?"
            name='task'/>
          </div>
          <ul>
            {tasks.map((task) => {
              return (
                <li
                className={task.completed ? 'completed' : ''}
                key={task.id}
                onClick={() => handleClick(task.id)}
                style={{ cursor: "pointer" }}>
                  {task.text}
                </li>
              )
            })}
          </ul>
        </form>
        <div className="todo-list-footer flex">
          <div>
            <span>items left</span>
          </div>
          <div className="filters flex">
            <button className='active'>All</button>
            <button>Active</button>
            <button>Completed</button>
          </div>
          <div>
            <button>Clear completed</button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Tasks