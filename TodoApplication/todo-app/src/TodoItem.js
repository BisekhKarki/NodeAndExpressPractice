import React from 'react';

const TodoItem = ({ task, deleteTask, toggleTask }) => {
    return (
        <li className={`todo-item ${task.completed ? 'completed' : ''}`}>
            <span onClick={toggleTask}>{task.text}</span>
            <button onClick={deleteTask}>Delete</button>
        </li>
    );
};

export default TodoItem;
