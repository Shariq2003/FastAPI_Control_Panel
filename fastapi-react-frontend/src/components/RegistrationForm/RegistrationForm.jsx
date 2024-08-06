import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import './RegistrationForm.css';

const RegistrationForm = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('0');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/register', {
                name,
                email,
                password,
                is_admin: role === '1',
            });
            alert('User Registered Successfully');
            navigate('/login');
        } catch (error) {
            console.error(error);
            alert('Registration Failed');
        }
    };

    return (
        <div className="registration-container">
            <form onSubmit={handleRegister} className="registration-form">
                <h2 className="registration-title">Register</h2>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="registration-input"
                />
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="registration-input"
                />
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="registration-input"
                />
                <label>Role:</label>
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="registration-select"
                >
                    <option value="0">Normal User</option>
                    <option value="1">Admin</option>
                </select>
                <button type="submit" className="registration-button">Register</button>
                <p>Already Registered ? <Link to="/login" className="login-link">Login Here</Link></p>
            </form>
        </div>
    );
};

export default RegistrationForm;
