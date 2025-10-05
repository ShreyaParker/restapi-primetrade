import React, { useState } from 'react';
import TaskForm from '../components/TaskForm.jsx';

const Dashboard = ({ username, role, tasks, loading, message, handleLogout, createTask, updateTask, deleteTask }) => {
    const [editingTask, setEditingTask] = useState(null);

    const handleCreateSubmit = (id, formData) => {
        createTask(formData);
    };

    const handleUpdateSubmit = (id, formData) => {
        updateTask(id, formData);
        setEditingTask(null);
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '2px solid #333', paddingBottom: '10px' }}>
                <h1>Task Dashboard</h1>
                <div>
                    <span style={{ marginRight: '20px' }}>User: {username} (<strong style={{ color: role === 'admin' ? 'purple' : 'green' }}>{role.toUpperCase()}</strong>)</span>
                    <button onClick={handleLogout} style={{ backgroundColor: '#ccc', padding: '8px 15px' }}>Logout</button>
                </div>
            </div>

           {loading && <p style={{ color: 'blue' }}>Loading tasks...</p>}
            {message && <p style={{ color: message.includes('success') || message.includes('created') || message.includes('updated') ? 'green' : 'red' }}>{message}</p>}

            <TaskForm type="create" onSubmit={handleCreateSubmit} />

            <h3>Your Tasks ({tasks.length})</h3>

            {tasks.length === 0 ? (
                <p>No tasks found. Create one above!</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {tasks.map(task => (
                        <div key={task._id}>
                            <li style={{ borderBottom: '1px solid #eee', padding: '10px 0', display: 'flex', justifyContent: 'space-between' }}>
                                <span>
                                    <strong>{task.title}</strong> ({task.status})
                                </span>
                                <div>
                                    <button
                                        onClick={() => setEditingTask(task)}
                                        style={{ marginRight: '10px', backgroundColor: 'blue', color: 'white' }}
                                    >
                                        Edit
                                    </button>

                                    {role === 'admin' && (
                                        <button
                                            onClick={() => deleteTask(task._id)}
                                            style={{ backgroundColor: 'red', color: 'white' }}
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            </li>

                            {editingTask && editingTask._id === task._id && (
                                <TaskForm
                                    type="update"
                                    task={editingTask}
                                    onSubmit={handleUpdateSubmit}
                                    onCancel={() => setEditingTask(null)}
                                />
                            )}
                        </div>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dashboard;