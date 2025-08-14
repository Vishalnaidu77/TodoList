import React, { useState } from 'react'
import {  X, CheckCheck, Pencil, Save } from 'lucide-react'

function TaskList({ tasks, onToggle, deleteTodo, updateTodo }) {

  const [editText, setEditText] = useState("")
  const [editId, setEditId] = useState(null)


  return (
    <div className='w-full py-2 px-4'>
        <ul className='flex flex-col items-center p-3 justify-between gap-5'>
            {tasks.map(task => 
  <li key={task.id} className='flex justify-between w-full bg-zinc-200 rounded py-3 px-5'>
    <div className='flex gap-4 items-center'>
      {editId === task.id ? (
        <>
          <button
            onClick={() => {
              updateTodo(editId, editText);
              setEditId(null);
              setEditText("");
            }}
            className="mr-2"
          >📁</button>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="border border-zinc-300 rounded p-2"
          />
        </>
      ) : (
        <>
          <button
            onClick={() => {
              setEditId(task.id);
              setEditText(task.text);
            }}
            className="mr-2"
          >✏️</button>
          <span className={`text-lg font-semibold ${task.completed ? "line-through text-zinc-500 italic" : ""}`}>
            {task.text}
          </span>
        </>
      )}
    </div>
    <div className="btns flex gap-4">
      <button onClick={() => onToggle(task.id)} className='text-green-600'><CheckCheck /></button>
      <button onClick={() => deleteTodo(task.id)} className='text-red-500'><X /></button>
    </div>
  </li>
)}
        </ul>

    </div>
  )
}

export default TaskList
