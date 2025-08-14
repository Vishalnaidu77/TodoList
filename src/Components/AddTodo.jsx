import React, { useState } from 'react'
import { Plus } from 'lucide-react';
import TaskList from './TaskList';

function AddTodo({ onAdd}) {

    const [inputValue, setInputValue] = useState('')

    const formSubmitted = (e) => {
        e.preventDefault()
        onAdd(inputValue)
        setInputValue('')
    }
 
  return (
    <div>
        <div className='flex flex-col gap-4 items-center'>
            <h1 className='text-2xl font-medium uppercase'>Simple Todo</h1>
            <form onSubmit={formSubmitted} className='flex items-center gap-2' action="">
                <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className='border rounded py-1 px-3 w-96' type="text" placeholder='Enter Todo...'/>
                <button type='submit' className='bg-black text-white w-10 py-1 px-2 rounded cursor-pointer'><Plus /></button>
            </form>
        </div>    
    </div>
  )
}

export default AddTodo
