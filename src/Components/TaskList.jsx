import React, { useState, useRef } from 'react'
import { X, CheckCheck, Trash, Edit3, Save } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import TodoStatus from './TodoStatus'

function TaskList({ tasks, onToggle, deleteTodo, updateTodo, completedTask, failTask, failedTask }) {
  const [editText, setEditText] = useState("")
  const [editId, setEditId] = useState(null)
  const [draggedTaskId, setDraggedTaskId] = useState(null)

  // Refs for drop zones
  const completedRef = useRef(null);
  const failedRef = useRef(null);

  // Helper to check if dropped over completed zone
  const isOverCompleted = (pointerEvent) => {
    const rect = completedRef.current?.getBoundingClientRect();
    if (!rect) return false;
    const { clientX, clientY } = pointerEvent;
    return (
      clientX >= rect.left &&
      clientX <= rect.right &&
      clientY >= rect.top &&
      clientY <= rect.bottom
    );
  };

  // Helper to check if dropped over failed zone
  const isOverFailed = (pointerEvent) => {
    const rect = failedRef.current?.getBoundingClientRect();
    if (!rect) return false;
    const { clientX, clientY } = pointerEvent;
    return (
      clientX >= rect.left &&
      clientX <= rect.right &&
      clientY >= rect.top &&
      clientY <= rect.bottom
    );
  };

  const activeTasks = tasks.filter(task => !task.completed && !task.failed);

  return (
    <div className='w-full h-full py-2 px-4'>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className='w-full bg-white rounded-2xl shadow-lg border border-zinc-200 overflow-hidden'
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className='text-2xl font-bold text-center text-zinc-700 py-4 bg-gradient-to-r from-zinc-50 to-zinc-100 border-b border-zinc-200'
        >
          Active Tasks
        </motion.h1>
        
        <div id='taskList' className='w-full h-80 overflow-auto p-4'>
          <AnimatePresence mode="popLayout">
            {activeTasks.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="text-4xl mb-4">📝</div>
                <p className="text-zinc-500 text-lg">No active tasks. Add some to get started!</p>
              </motion.div>
            ) : (
              <ul className='flex flex-col gap-3'>
                {activeTasks.map((task, index) => 
                  <motion.li
                    key={task.id}
                    layout
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      scale: draggedTaskId === task.id ? 1.05 : 1,
                    }}
                    exit={{ 
                      opacity: 0, 
                      y: -10,
                      transition: { duration: 0.2 }
                    }}
                    transition={{ 
                      duration: 0.2,
                      ease: "easeOut"
                    }}
                    whileHover={{ 
                      scale: 1, 
                      y: -2,
                      boxShadow: "0 8px 25px rgba(0,0,0,0.1)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex justify-between w-full bg-gradient-to-r from-white to-zinc-50 rounded-xl py-4 px-6 border-2 transition-all duration-200 ${
                      draggedTaskId === task.id 
                        ? 'border-blue-300 shadow-lg shadow-blue-100' 
                        : 'border-zinc-200 hover:border-zinc-300'
                    }`}
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    onDragStart={() => setDraggedTaskId(task.id)}
                    onDragEnd={(event) => {
                      setDraggedTaskId(null);
                      if (isOverCompleted(event)) {
                        onToggle(task.id);
                      } else if (isOverFailed(event)) {
                        failTask(task.id);
                      }
                    }}
                  >
                    <div className='flex gap-4 items-center flex-1'>
                      {editId === task.id ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex items-center gap-3 flex-1"
                        >
                          <motion.button
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                              if (editText.trim()) {
                                updateTodo(editId, editText.trim());
                                setEditId(null);
                                setEditText("");
                              }
                            }}
                            className="text-green-600 p-2 rounded-lg hover:bg-green-50 transition-colors"
                          >
                            <Save size={18} />
                          </motion.button>
                          <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && editText.trim()) {
                                updateTodo(editId, editText.trim());
                                setEditId(null)
                                setEditText("")
                              } else if (e.key === "Escape") {
                                setEditId(null);
                                setEditText("");
                              }
                            }}
                            className="border-2 border-blue-200 rounded-lg p-3 flex-1 focus:border-blue-400 focus:outline-none transition-colors bg-white"
                            autoFocus
                          />
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-3 flex-1"
                        >
                          <motion.button
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                              setEditId(task.id);
                              setEditText(task.text);
                            }}
                            className="text-blue-600 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                          >
                            <Edit3 size={18} />
                          </motion.button>
                          <span className="text-lg font-medium text-zinc-800">
                            {task.text}
                          </span>
                        </motion.div>
                      )}
                    </div>
                    
                    <div className="btns flex gap-2">
                      <motion.button  
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onToggle(task.id)}
                        className='text-green-600 p-2 rounded-lg hover:bg-green-50 transition-colors'
                        title="Mark as completed"
                      >
                        <CheckCheck size={20} />
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => failTask(task.id)} 
                        className='text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors'
                        title="Mark as failed"
                      >
                        <X size={20} />
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteTodo(task.id)} 
                        className='text-gray-500 p-2 rounded-lg hover:bg-gray-50 transition-colors'
                        title="Delete task"
                      >
                        <Trash size={20} />
                      </motion.button>
                    </div>
                  </motion.li>
                )}
              </ul>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="taskUpdate mt-6 flex gap-6"
      >
        <div className='flex md:flex-row flex-col w-full gap-6'>
          <motion.div 
            ref={completedRef} 
            className='w-full'
            style={{
              boxShadow: draggedTaskId ? "0 0 20px rgba(34, 197, 94, 0.3)" : "none"
            }}
            transition={{ duration: 0.2 }}
          >
            <div className={`rounded-2xl transition-all duration-300 ${
              draggedTaskId ? 'bg-green-50 border-2 border-green-300 border-dashed p-1' : ''
            }`}>
              <TodoStatus 
                heading="✅ Completed Tasks" 
                emptyTask="No tasks completed yet" 
                tasks={completedTask}
                deleteTodo={deleteTodo}
              />
            </div>
          </motion.div>
          
          <motion.div 
            ref={failedRef} 
            className='w-full'
            style={{
              boxShadow: draggedTaskId ? "0 0 20px rgba(239, 68, 68, 0.3)" : "none"
            }}
            transition={{ duration: 0.2 }}
          >
            <div className={`rounded-2xl transition-all duration-300 ${
              draggedTaskId ? 'bg-red-50 border-2 border-red-300 border-dashed p-1' : ''
            }`}>
              <TodoStatus 
                heading="❌ Failed Tasks" 
                emptyTask="No tasks failed yet" 
                tasks={failedTask}
                deleteTodo={deleteTodo}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}


export default TaskList;