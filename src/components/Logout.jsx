// src/components/Logout.js
import React from 'react';

const Logout = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');  // Remove token from localStorage
        window.location.href = '/login';  // Redirect to login page
    };

    return (
        <button onClick={handleLogout} className="btn btn-danger">
            Logout
        </button>
    );
};

export default Logout;
