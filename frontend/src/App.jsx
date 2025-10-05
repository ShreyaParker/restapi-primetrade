import React, { useState, useEffect } from 'react';
import AuthPage from './pages/AuthPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import { apiFetch } from './api/apiFetch.js';

function App() {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [username, setUsername] = useState(localStorage.getItem('username') || ''); // NEW STATE: Capture Username
    const [role, setRole] = useState(localStorage.getItem('role') || '');
    const [tasks, setTasks] = useState([]);
    const [message, setMessage] = useState('');
    const [view, setView] = useState('login'); // login, register, dashboard
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (token) {
            fetchTasks();
        } else {
            setTasks([]);
            setUser(null);
            setRole('');
            setUsername('');
            setView('login');
        }

    }, [token]);

    const handleAuth = async (isRegister, formData) => {
        setLoading(true);
        setMessage('');
        const endpoint = `/auth/${isRegister ? 'register' : 'login'}`;

        try {
            const data = await apiFetch(endpoint, null, {
                method: 'POST',
                body: JSON.stringify(formData),
            });

            if (isRegister) {
                setMessage('Registration successful! Please log in.');
                setView('login');
            } else {

                setToken(data.token);
                setUser(data.userId);
                setRole(data.role);
                setUsername(data.username);

                localStorage.setItem('token', data.token);
                localStorage.setItem('role', data.role);
                localStorage.setItem('username', data.username);

                setMessage('Login successful!');
                setView('dashboard');
            }
        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        setToken('');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('username');
        setMessage('Logged out successfully.');
        setView('login');
    };
    const fetchTasks = async () => {
        if (!token) return;
        try {
            setLoading(true);
            const data = await apiFetch('/task', token, { method: 'GET' });
            setTasks(data || []);
            setView('dashboard');
        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    const createTask = async (formData) => {
        try {
            setLoading(true);
            await apiFetch('/task', token, {
                method: 'POST',
                body: JSON.stringify(formData),
            });
            setMessage('Task created!');
            await fetchTasks();
        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    const updateTask = async (taskId, formData) => {
        try {
            setLoading(true);
            await apiFetch(`/task/${taskId}`, token, {
                method: 'PUT',
                body: JSON.stringify(formData),
            });
            setMessage('Task updated!');
            await fetchTasks();
        } catch (error) {
            setMessage(`Failed to update: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            setLoading(true);
            await apiFetch(`/task/${taskId}`, token, { method: 'DELETE' });
            setMessage('Task deleted!');
            await fetchTasks();
        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };



    if (token) {
        return (
            <Dashboard
                user={user}
                username={username}
                role={role}
                tasks={tasks}
                loading={loading}
                message={message}
                handleLogout={handleLogout}
                createTask={createTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
            />
        );
    }


    return (
        <div style={{ fontFamily: 'Arial, sans-serif' }}>
            <AuthPage
                handleAuth={handleAuth}
                loading={loading}
                message={message}
                setView={setView}
            />
        </div>
    );
}

export default App;