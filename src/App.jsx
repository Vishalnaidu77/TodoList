import { useState, useId } from 'react'
import './App.css'
import AddTodo from './Components/AddTodo'
import { v4 as uuidv4 } from 'uuid';
import TaskList from './Components/TaskList'

function App() {
    const [tasks, setTasks] = useState([])
    

    const addTask = (tasktext) => {
      const idx = uuidv4()
      setTasks(prevTask => [{id: idx, text: tasktext, completed: false}, ...prevTask])
      
    }

    const toggleTask = (id) => {
        setTasks(tasks.map(task => 
          task.id === id ? {...task, completed: !task.completed} : task
      ));
    }

      const deleteTodo = (id) => {
        setTasks(tasks.filter(task => 
          task.id !== id 
        ))
      }

      const updateTodo = (id, newText) => {
        setTasks(tasks.map(task => 
          task.id === id ? {...task, text: newText} : task
        ))
      }


  return (
    <>
    <div className='max-h-[50%] flex justify-center mt-5'>
        <div className='h-[90%] w-[60%] shadow-xl bg-zinc-100 rounded-2xl flex flex-col items-center py-5 gap-4'>
          <AddTodo onAdd = {addTask}/>
          <TaskList tasks={tasks} onToggle={toggleTask} deleteTodo={deleteTodo} updateTodo={updateTodo} />
        </div>
    </div>
    </>
  )
}

export default App
