
import React, { useState } from 'react';

const AuthPage = ({ handleAuth, loading, message, setView }) => {
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'user',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        let dataToSend = formData;

        if (!isRegister) {
            dataToSend = {
                email: formData.email,
                password: formData.password,
            };
        }

        handleAuth(isRegister, dataToSend);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>{isRegister ? 'Register' : 'Login'}</h2>
            {message && <p style={{ color: message.includes('success') ? 'green' : 'red' }}>{message}</p>}

            <form onSubmit={handleSubmit}>
                {isRegister && (
                    <>
                        <input type="text" name="username" placeholder="Username" onChange={handleChange} required style={{ marginBottom: '10px', width: '100%', padding: '8px' }}/>
                        <select name="role" onChange={handleChange} value={formData.role} style={{ marginBottom: '10px', width: '100%', padding: '8px' }}>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </>
                )}
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required style={{ marginBottom: '10px', width: '100%', padding: '8px' }}/>
                <input type="password" name="password" placeholder="Password (min 8 chars)" onChange={handleChange} required style={{ marginBottom: '15px', width: '100%', padding: '8px' }}/>

                <button type="submit" disabled={loading} style={{ padding: '10px 15px', width: '100%', backgroundColor: 'blue', color: 'white' }}>
                    {loading ? 'Processing...' : (isRegister ? 'Register' : 'Login')}
                </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '15px' }}>
                {isRegister ? 'Already have an account?' : "Don't have an account?"}
                <button onClick={() => setIsRegister(!isRegister)} style={{ marginLeft: '10px', color: 'blue', border: 'none', background: 'none' }}>
                    {isRegister ? 'Login here' : 'Register here'}
                </button>
            </p>
        </div>
    );
};

export default AuthPage;