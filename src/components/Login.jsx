import React, { useState } from 'react';
import axios from 'axios';
import BASE_URL from '../api/api'; 
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();  // Initialize navigate

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/login`, {
                email,
                password
            });
            const token = response.data.data.token;  // Assuming the API returns a token upon successful login
            localStorage.setItem('token', token);  // Save token in localStorage
            setMessage('Login successful! Redirecting to home...');
            
            // Redirect to the home route after successful login
            navigate('/'); 
        } catch (error) {
            setMessage('Login failed, please try again.');
        }
    };

    return (
        <div className="container mx-auto">
            <h1 className="my-4">Login</h1>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            {message && <p className="mt-3">{message}</p>}
            {/* Add the signup link below */}
            <p className="mt-3">
                Don't have an account? <Link to="/signup">Sign up here</Link>
            </p>
        </div>
    );
};

export default Login;
