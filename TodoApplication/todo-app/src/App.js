import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './TodoList';
import axios from 'axios';
import './App.css';

const App = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:4000/todos');
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    const addTask = (task) => {
        setTasks([...tasks, task]);
    };

    const deleteTask = async (index) => {
        const taskToDelete = tasks[index];
        try {
            await axios.delete(`http://localhost:4000/todos/${taskToDelete._id}`);
            setTasks(tasks.filter((_, i) => i !== index));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const toggleTask = async (index) => {
        const taskToToggle = tasks[index];
        try {
            const response = await axios.patch(`http://localhost:4000/todos/${taskToToggle._id}`, {
                completed: !taskToToggle.completed,
            });
            const newTasks = tasks.map((task, i) => (i === index ? response.data : task));
            setTasks(newTasks);
        } catch (error) {
            console.error('Error toggling task:', error);
        }
    };

    return (
        <div className="container">
            <h1>To-Do List</h1>
            <TodoForm addTask={addTask} />
            <TodoList tasks={tasks} deleteTask={deleteTask} toggleTask={toggleTask} />
        </div>
    );
};

export default App;
