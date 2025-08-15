import { useState, useRef } from 'react'
import './App.css'
import AddTodo from './Components/AddTodo'
import { v4 as uuidv4 } from 'uuid';
import TaskList from './Components/TaskList'
import { motion, AnimatePresence } from "framer-motion"

function App() {
    const [tasks, setTasks] = useState([])

    const addTask = (tasktext) => {
      const idx = uuidv4()// Using built-in crypto instead of uuid
      setTasks(prevTask => [{id: idx, text: tasktext, completed: false, failed: false}, ...prevTask])
    }

    const toggleTask = (id) => {
        setTasks(tasks => tasks.map(task => 
          task.id === id ? {...task, completed: !task.completed, failed: false} : task
        ));
    }

    const deleteTodo = (id) => {
        setTasks(tasks => tasks.filter(task => task.id !== id))
    }

    const updateTodo = (id, newText) => {
        setTasks(tasks => tasks.map(task => 
          task.id === id ? {...task, text: newText} : task
        ))
    }

    const failTask = (id) => {
        setTasks(tasks => tasks.map(task => 
          task.id === id ? {...task, failed: true, completed: false} : task
        ))
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center py-8'>
            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className='w-[90%] max-w-6xl shadow-2xl bg-white rounded-3xl flex flex-col items-center py-8 gap-6 border border-zinc-200'
            >
                <AddTodo onAdd={addTask}/>
                <TaskList 
                    tasks={tasks} 
                    onToggle={toggleTask} 
                    deleteTodo={deleteTodo} 
                    updateTodo={updateTodo} 
                    completedTask={tasks.filter(task => task.completed && !task.failed)} 
                    failTask={failTask} 
                    failedTask={tasks.filter(task => task.failed)}
                />
            </motion.div>
        </div>
    )
}

export default App
