
import React, { useState } from 'react';

const TaskForm = ({ type, onSubmit, task = null, onCancel }) => {

    const [formData, setFormData] = useState({
        title: task ? task.title : '',
        description: task ? task.description : '',
        status: task ? task.status : 'pending',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit(task ? task._id : null, formData);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const buttonText = type === 'create' ? 'Add Task' : 'Save Changes';

    return (
        <form onSubmit={handleSubmit} style={{ border: type === 'update' ? '1px solid orange' : '1px dashed #ccc', padding: '15px', marginBottom: '20px', borderRadius: '5px', backgroundColor: type === 'update' ? '#fffbe6' : 'transparent' }}>
            <h4>{type === 'create' ? 'Create New Task' : `Editing: ${task.title}`}</h4>
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title (3-10 chars)" required style={{ marginRight: '10px', width: '150px' }}/>
            <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" style={{ marginRight: '10px', width: '200px' }}/>
            <select name="status" value={formData.status} onChange={handleChange} style={{ marginRight: '10px' }}>
                <option value="pending">Pending</option>
                <option value="in-progress">In-Progress</option>
                <option value="completed">Completed</option>
            </select>
            <button type="submit" style={{ backgroundColor: type === 'update' ? 'green' : 'blue', color: 'white', marginRight: '5px' }}>{buttonText}</button>
            {type === 'update' && (
                <button type="button" onClick={onCancel} style={{ backgroundColor: '#ccc' }}>Cancel</button>
            )}
        </form>
    );
};

export default TaskForm;