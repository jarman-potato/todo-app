import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [priority, setPriority] = useState('medium');

  const addTodo = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setTodos([...todos, { 
        id: Date.now(), 
        text: input, 
        completed: false,
        priority: priority
      }]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const changePriority = (id, newPriority) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, priority: newPriority } : todo
    ));
  };

  const priorityOrder = { high: 0, medium: 1, low: 2 };
  const sortedTodos = [...todos].sort((a, b) => 
    priorityOrder[a.priority] - priorityOrder[b.priority]
  );

  return (
    <div className="app">
      <h1>Todo App</h1>
      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task..."
          className="todo-input"
        />
        <select 
          value={priority} 
          onChange={(e) => setPriority(e.target.value)}
          className="priority-select"
        >
          <option value="high">🔴 High</option>
          <option value="medium">🟡 Medium</option>
          <option value="low">🟢 Low</option>
        </select>
        <button type="submit" className="add-btn">Add</button>
      </form>
      <ul className="todo-list">
        {sortedTodos.map(todo => (
          <li key={todo.id} className={`todo-item priority-${todo.priority} ${todo.completed ? 'completed' : ''}`}>
            <div className="todo-content">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="todo-checkbox"
              />
              <span 
                className="todo-text"
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.text}
              </span>
            </div>
            <div className="todo-controls">
              <select 
                value={todo.priority} 
                onChange={(e) => changePriority(todo.id, e.target.value)}
                className="todo-priority"
              >
                <option value="high">🔴 High</option>
                <option value="medium">🟡 Medium</option>
                <option value="low">🟢 Low</option>
              </select>
              <button onClick={() => deleteTodo(todo.id)} className="delete-btn">×</button>
            </div>
          </li>
        ))}
      </ul>
      {todos.length === 0 && <p className="empty">No tasks yet. Add one above!</p>}
    </div>
  );
}

export default App;
