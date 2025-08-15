import React from 'react';
import {  Trash } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"



const TodoStatus = ({ heading, tasks = [], emptyTask, deleteTodo }) => {    
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            id='taskList' 
            className='w-[100%] h-64 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-xl p-4 shadow-lg overflow-auto border border-zinc-300'
        >
            <motion.h1 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className='text-xl font-semibold text-center text-zinc-700 mb-3'
            >
                {heading}
            </motion.h1>
            
            <div className='rounded mt-2 flex flex-col gap-2'>   
                {tasks.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className='flex justify-center items-center h-28 text-lg font-medium text-zinc-500'
                    >
                        {emptyTask}
                    </motion.div>
                ) : (
                    <AnimatePresence>
                        {tasks.map((task, index) =>
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
                                    damping: 20
                                }}
                                whileHover={{ scale: 1.02, y: -1 }}
                                className='bg-white rounded-lg p-3 shadow-sm border border-zinc-200 hover:shadow-md transition-shadow'
                            >
                                <div className='md:flex justify-between items-center'>
                                    <motion.h1 
                                        className='flex-1 text-zinc-700 font-medium'
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
                                        className='text-red-500 p-1 rounded hover:bg-red-50 transition-colors ml-2'
                                    >
                                        <Trash size={16} />
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </div>
        </motion.div>
    );
};

export default TodoStatus;