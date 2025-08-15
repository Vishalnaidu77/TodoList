"use client"

import { useState, useRef, useEffect } from "react"
import { X, CheckCheck, Trash, Edit3, Save, MoreVertical } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Enhanced TodoStatus Component
const TodoStatus = ({ heading, tasks = [], emptyTask, deleteTodo }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      id="taskList"
      className="w-[100%] h-64 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-xl p-4 shadow-lg overflow-auto border border-zinc-300"
    >
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-semibold text-center text-zinc-700 mb-3"
      >
        {heading}
      </motion.h1>

      <div className="rounded mt-2 flex flex-col gap-2">
        {tasks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center items-center h-28 text-lg font-medium text-zinc-500"
          >
            {emptyTask}
          </motion.div>
        ) : (
          <AnimatePresence>
            {tasks.map((task, index) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 150,
                  damping: 20,
                }}
                whileHover={{ scale: 1.02, y: -1 }}
                className="bg-white rounded-lg p-3 shadow-sm border border-zinc-200 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <motion.h1
                    className="flex-1 text-zinc-700 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {task.text}
                  </motion.h1>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => deleteTodo(task.id)}
                    className="text-red-500 p-1 rounded hover:bg-red-50 transition-colors ml-2"
                  >
                    <Trash size={16} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  )
}

// Enhanced TaskList Component
function TaskList({ tasks = [], onToggle, deleteTodo, updateTodo, completedTask = [], failTask, failedTask = [] }) {
  const [editText, setEditText] = useState("")
  const [editId, setEditId] = useState(null)
  const [draggedTaskId, setDraggedTaskId] = useState(null)
  const [showActionsId, setShowActionsId] = useState(null)

  // Refs for drop zones
  const completedRef = useRef(null)
  const failedRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showActionsId && !event.target.closest(".actions-dropdown")) {
        setShowActionsId(null)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [showActionsId])

  // Helper to check if dropped over completed zone
  const isOverCompleted = (pointerEvent) => {
    const rect = completedRef.current?.getBoundingClientRect()
    if (!rect) return false
    const { clientX, clientY } = pointerEvent
    return clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom
  }

  // Helper to check if dropped over failed zone
  const isOverFailed = (pointerEvent) => {
    const rect = failedRef.current?.getBoundingClientRect()
    if (!rect) return false
    const { clientX, clientY } = pointerEvent
    return clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom
  }

  const activeTasks = tasks.filter((task) => !task.completed && !task.failed)

  return (
    <div className="w-full h-full py-2 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full bg-white rounded-2xl shadow-lg border border-zinc-200 overflow-hidden"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-xl sm:text-2xl font-bold text-center text-zinc-700 py-4 bg-gradient-to-r from-zinc-50 to-zinc-100 border-b border-zinc-200"
        >
          Active Tasks
        </motion.h1>

        <div id="taskList" className="w-full h-80 overflow-auto p-4">
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
              <ul className="flex flex-col gap-3">
                {activeTasks.map((task, index) => (
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
                      transition: { duration: 0.2 },
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeOut",
                    }}
                    whileHover={{
                      scale: 1,
                      y: -2,
                      boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative flex justify-between w-full bg-gradient-to-r from-white to-zinc-50 rounded-xl py-4 px-4 sm:px-6 border-2 transition-all duration-200 ${
                      draggedTaskId === task.id
                        ? "border-blue-300 shadow-lg shadow-blue-100"
                        : "border-zinc-200 hover:border-zinc-300"
                    } ${showActionsId === task.id ? "z-[100]" : "z-10"}`}
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    onDragStart={() => setDraggedTaskId(task.id)}
                    onDragEnd={(event) => {
                      setDraggedTaskId(null)
                      if (isOverCompleted(event)) {
                        onToggle(task.id)
                      } else if (isOverFailed(event)) {
                        failTask(task.id)
                      }
                    }}
                  >
                    <div className="flex gap-2 sm:gap-4 items-center flex-1 min-w-0">
                      {editId === task.id ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex items-center gap-2 sm:gap-3 flex-1"
                        >
                          <motion.button
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                              if (editText.trim()) {
                                updateTodo(editId, editText.trim())
                                setEditId(null)
                                setEditText("")
                              }
                            }}
                            className="text-green-600 p-1.5 sm:p-2 rounded-lg hover:bg-green-50 transition-colors flex-shrink-0"
                          >
                            <Save size={16} className="sm:w-[18px] sm:h-[18px]" />
                          </motion.button>
                          <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && editText.trim()) {
                                updateTodo(editId, editText.trim())
                                setEditId(null)
                                setEditText("")
                              } else if (e.key === "Escape") {
                                setEditId(null)
                                setEditText("")
                              }
                            }}
                            className="border-2 border-blue-200 rounded-lg p-2 sm:p-3 flex-1 focus:border-blue-400 focus:outline-none transition-colors bg-white text-sm sm:text-base"
                            autoFocus
                          />
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0"
                        >
                          <motion.button
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                              setEditId(task.id)
                              setEditText(task.text)
                            }}
                            className="text-blue-600 p-1.5 sm:p-2 rounded-lg hover:bg-blue-50 transition-colors flex-shrink-0"
                          >
                            <Edit3 size={16} className="sm:w-[18px] sm:h-[18px]" />
                          </motion.button>
                          <span className="text-base sm:text-lg font-medium text-zinc-800 truncate">{task.text}</span>
                        </motion.div>
                      )}
                    </div>

                    <div className="btns flex gap-1 sm:gap-2 items-center actions-dropdown">
                      <motion.button
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onToggle(task.id)}
                        className="text-green-600 p-2 rounded-lg hover:bg-green-50 transition-colors hidden sm:inline-flex"
                        title="Mark as completed"
                      >
                        <CheckCheck size={20} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => failTask(task.id)}
                        className="text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors hidden sm:inline-flex"
                        title="Mark as failed"
                      >
                        <X size={20} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteTodo(task.id)}
                        className="text-gray-500 p-2 rounded-lg hover:bg-gray-50 transition-colors hidden sm:inline-flex"
                        title="Delete task"
                      >
                        <Trash size={20} />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          setShowActionsId(showActionsId === task.id ? null : task.id)
                        }}
                        className="text-gray-500 p-2 rounded-lg hover:bg-gray-50 transition-colors sm:hidden relative"
                        title="More actions"
                      >
                        <MoreVertical size={18} />
                      </motion.button>

                      <AnimatePresence>
                        {showActionsId === task.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: -10 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                            className="absolute right-0 top-full mt-2 z-[100] sm:hidden"
                          >
                            <div className="flex flex-col bg-white rounded-xl shadow-xl border border-zinc-200 overflow-hidden min-w-[140px]">
                              <motion.button
                                whileHover={{ backgroundColor: "rgb(240 253 244)" }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                  onToggle(task.id)
                                  setShowActionsId(null)
                                }}
                                className="flex items-center gap-3 text-green-600 px-4 py-3 text-left transition-colors border-b border-zinc-100"
                              >
                                <CheckCheck size={16} />
                                <span className="text-sm font-medium">Complete</span>
                              </motion.button>
                              <motion.button
                                whileHover={{ backgroundColor: "rgb(254 242 242)" }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                  failTask(task.id)
                                  setShowActionsId(null)
                                }}
                                className="flex items-center gap-3 text-red-500 px-4 py-3 text-left transition-colors border-b border-zinc-100"
                              >
                                <X size={16} />
                                <span className="text-sm font-medium">Mark Failed</span>
                              </motion.button>
                              <motion.button
                                whileHover={{ backgroundColor: "rgb(249 250 251)" }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                  deleteTodo(task.id)
                                  setShowActionsId(null)
                                }}
                                className="flex items-center gap-3 text-gray-500 px-4 py-3 text-left transition-colors"
                              >
                                <Trash size={16} />
                                <span className="text-sm font-medium">Delete</span>
                              </motion.button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.li>
                ))}
              </ul>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="taskUpdate mt-6 flex flex-col lg:flex-row gap-6 w-full"
      >
        <motion.div
          ref={completedRef}
          className="w-full lg:w-[50%]"
          style={{
            boxShadow: draggedTaskId ? "0 0 20px rgba(34, 197, 94, 0.3)" : "none",
          }}
          transition={{ duration: 0.2 }}
        >
          <div
            className={`rounded-2xl transition-all duration-300 ${
              draggedTaskId ? "bg-green-50 border-2 border-green-300 border-dashed p-1" : ""
            }`}
          >
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
          className="w-full lg:w-[50%]"
          style={{
            boxShadow: draggedTaskId ? "0 0 20px rgba(239, 68, 68, 0.3)" : "none",
          }}
          transition={{ duration: 0.2 }}
        >
          <div
            className={`rounded-2xl transition-all duration-300 ${
              draggedTaskId ? "bg-red-50 border-2 border-red-300 border-dashed p-1" : ""
            }`}
          >
            <TodoStatus
              heading="❌ Failed Tasks"
              emptyTask="No tasks failed yet"
              tasks={failedTask}
              deleteTodo={deleteTodo}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default TaskList
