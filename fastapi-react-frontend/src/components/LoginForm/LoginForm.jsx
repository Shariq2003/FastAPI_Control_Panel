import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import './LoginForm.css';

const LoginForm = ({ loginHandler }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/token', new URLSearchParams({
                username: email,
                password,
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            localStorage.setItem('token', response.data.access_token);
            if (response.data.is_admin) {
                navigate('/admin');
                localStorage.setItem('is_admin', response.data.is_admin);
            }
            loginHandler();
            alert('Login successful!');
        } catch (error) {
            console.error(error);
            alert('Login failed!');
            localStorage.setItem('is_admin', false);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <h2 className="login-title">Login</h2>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="login-input"
                />
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="login-input"
                />
                <button type="submit" className="login-button">Login</button>
                <p>Don't Have Account ?<Link to="/register" className="login-link"> Register Here</Link></p>
            </form>
        </div>
    );
};

export default LoginForm;
