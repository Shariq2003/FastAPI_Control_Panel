import React, { useState } from 'react';
import Auth from '../../services/auth';
import { useNavigate,Link } from 'react-router-dom';
import './LoginForm.css';
import toast from 'react-hot-toast';
import AxiosApi from '../../services/axios.api';

const LoginForm = ({ loginHandler }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await AxiosApi.post("/token", new URLSearchParams({
                username: email,
                password,
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            Auth.saveAuthorizationToken(response.access_token);
            Auth.saveRefreshToken(response.refresh_token);
            await Auth.authorize(true);
            toast.success("Login Successful!");
            if (response.is_admin){
                navigate('/admin')
            }
            else{
                navigate('/user');
            }
        } catch (err) {
            toast.error("Login failed. Please check your credentials!");
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <h2 className="login-title">Login</h2>
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="login-input"
                />
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="login-input"
                />
                <button type="submit" className="login-button">Login</button>
                <p>Don't have an account? <Link to="/register" className="login-link">Register Here</Link></p>
            </form>
        </div>
    );
};

export default LoginForm;
