import React, { useState } from 'react';
import axios from 'axios';

const TodoForm = ({ addTask }) => {
    const [task, setTask] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (task.trim()) {
            try {
                const response = await axios.post('http://localhost:4000/todos', { text: task });
                addTask(response.data);
                setTask('');
            } catch (error) {
                console.error('Error adding task:', error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="todo-form">
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Add a new task..."
            />
            <button type="submit">Add</button>
        </form>
    );
};

export default TodoForm;
