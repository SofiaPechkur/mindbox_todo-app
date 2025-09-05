import { useState } from 'react'
import './Tasks.css'

const defaultTasks = [
  {id: 1, text: "Купить продукты", completed: false},
  {id: 2, text: "Погладить кота", completed: false},
  {id: 3, text: "Позвонить в ЖКХ", completed: false}
]

const Tasks = () => {
  const [inputValue, setInputValue] = useState('');
  // {id: Date.now(), text: "New task", completed: false}
  const [tasks, setTasks] = useState([...defaultTasks])
  const [activeFilter, setActiveFilter] = useState([
    {nameFilter: 'All', selected: true},
    {nameFilter: 'Active', selected: false},
    {nameFilter: 'Completed', selected: false}
  ])

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const newTask = {id: Date.now(), text: inputValue, completed: false};
    setTasks([newTask, ...tasks]);
    setInputValue('');
  };

  const handleClickTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task))
  }

  const handleClickFilter = (nameFilter) => {
    setActiveFilter(activeFilter
      .map(filter => filter.nameFilter === nameFilter
      ?
      { ...filter, selected: true}
      :
      { ...filter, selected: false}
      ))
  }

  const handleClickClear = () => {
    setTasks(tasks.filter(task => !task.completed))
  }

  const selectedFilter = activeFilter.find(filter => filter.selected).nameFilter;
  const filteredTasks = tasks.filter(task => {
  if (selectedFilter === "Active") return !task.completed;
  if (selectedFilter === "Completed") return task.completed;
  return true;
});

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
            {filteredTasks.map((task) => {
              return (
                <li
                className={task.completed ? 'completed' : ''}
                key={task.id}
                onClick={() => handleClickTask(task.id)}
                style={{ cursor: "pointer" }}>
                  {task.text}
                </li>
              )
            })}
          </ul>
        </form>
        <div className="todo-list-footer flex">
          <div>
            <span>{tasks.filter(task => !task.completed).length} items left</span>
          </div>
          <div className="filters flex">
            {activeFilter.map(filter => (
              <button
                key={filter.nameFilter}
                style={{ cursor: "pointer" }}
                className={filter.selected ? "active" : ""}
                onClick={() => handleClickFilter(filter.nameFilter)}
              >
                {filter.nameFilter}
              </button>
            ))}
          </div>
          <div>
            <button onClick={handleClickClear}>Clear completed</button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Tasks