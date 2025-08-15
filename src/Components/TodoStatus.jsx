import React from 'react';

const TodoStatus = ({ heading }) => {
    return (
        <>
            <div className='w-[50%] h-64 bg-zinc-200 rounded-xl p-4 shadow-md'>
                <h1 className='text-xl font-semibold text-center'>{heading}</h1>
            </div>
        </>
    );
};

export default TodoStatus;