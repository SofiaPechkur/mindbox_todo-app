import React, { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <h1>todos</h1>
      </header>
      <section>
        <div className="todo-list">
          <p>What needs to be done?</p>
          <ul>
            <li>Тестовое задание</li>
            <li>Прекрасный код</li>
            <li>Покрытие тестами</li>
          </ul>
        </div>
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
      <footer>
        <p>bySofia</p>
      </footer>
    </>
  )
}

export default App
