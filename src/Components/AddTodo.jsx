import React, { useState } from 'react'
import { Plus } from 'lucide-react';
import TaskList from './TaskList';
import { motion, AnimatePresence } from "framer-motion"

const AddTodo = ({ onAdd }) => {
    const [inputValue, setInputValue] = useState('')

    const formSubmitted = (e) => {
        e.preventDefault()
        if (inputValue.trim()) {
            onAdd(inputValue.trim())
            setInputValue('')
        }
    }
 
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className='flex flex-col gap-6 items-center'>
                <motion.h1 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className='text-3xl font-bold uppercase bg-blue-500 bg-clip-text text-transparent'
                >
                    Simple Todo
                </motion.h1>
                
                <motion.form 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    onSubmit={formSubmitted} 
                    className='flex items-center gap-3' 
                >
                    <motion.input
                        whileFocus={{ scale: 1.02 }}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className='border-2 border-zinc-300 rounded-lg py-3 px-4 w-[80%] sm:w-96 focus:border-blue-400 focus:outline-none transition-colors shadow-sm bg-white' 
                        type="text" 
                        placeholder='Enter your todo...'
                        required
                    />
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type='submit' 
                        className='bg-blue-500 text-white w-12 h-12 rounded-lg cursor-pointer shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center'
                    >
                        <Plus size={20} />
                    </motion.button>
                </motion.form>
            </div>    
        </motion.div>
    )
}

export default AddTodo
