import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import BASE_URL from '../api/api'; // Import the base URL

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({}); // Initialize error state
    const navigate = useNavigate(); // Initialize navigate hook

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({}); // Reset errors on form submit
        try {
            const response = await axios.post(`${BASE_URL}/register`, {
                name,
                email,
                password
            });
            if (response.data.success) {
                setMessage('Signup successful! Redirecting to login...'); // Display success message
                setTimeout(() => {
                    navigate('/login'); // Redirect to login after 3 seconds
                }, 3000); // Set a delay of 3 seconds for the message to be seen
            } else {
                // Handle validation errors from server response
                if (response.data.errors) {
                    setErrors({
                        email: response.data.errors.email[0] // Set the first error message for email
                    });
                } else {
                    setMessage(response.data.message);
                setTimeout(() => {
                    navigate('/login'); // Redirect to login after 3 seconds
                }, 3000);
                }
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage('Error occurred: ' + error.response.data.message);
            } else {
                setMessage('An unexpected error occurred.');
            }
        }
    };

    return (
        <div className="container">
            <h1 className="">Signup</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    {errors.name && <p className="text-danger">{errors.name}</p>} {/* Display error message */}
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {errors.email && <p className="text-danger">{errors.email}</p>} {/* Display error message */}
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {errors.password && <p className="text-danger">{errors.password}</p>} {/* Display error message */}
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
            {message && <p className="mt-3" style={{ color: message.includes('successful') ? 'green' : 'red' }}>{message}</p>} {/* Success message in green, error in red */}
            
            <p className="mt-3">
                Already have an account? <Link to="/login">Login here</Link>
            </p>
        </div>
    );
};

export default Signup;
