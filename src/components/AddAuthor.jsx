import React, { useState } from 'react';
import axios from 'axios';
import BASE_URL from '../api/api'; // Ensure BASE_URL is correctly imported
import { useNavigate } from 'react-router-dom';

const AddAuthor = () => {
    const [newAuthor, setNewAuthor] = useState({
        name: '',
        bio: '' // Added bio field
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAuthor({ ...newAuthor, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        // API call to add a new author
        axios.post(`${BASE_URL}/add-author`, newAuthor, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            alert('Author added successfully!');
            setNewAuthor({ name: '', bio: '' }); // Reset form
            setError(''); // Clear any existing error
        })
        .catch(err => {
            console.error(err);
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Error adding author');
            }
        });
    };

    return (
        <div className="container mb-2">
            <h1 className="my-4">Add New Author</h1>
            {error && <p className="text-danger">{error}</p>} {/* Display error message */}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Author Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        name="name" 
                        value={newAuthor.name} 
                        onChange={handleInputChange} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="bio" className="form-label">Biography</label>
                    <textarea 
                        className="form-control" 
                        id="bio" 
                        name="bio" 
                        value={newAuthor.bio} 
                        onChange={handleInputChange} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Author</button>
            </form>
        </div>
    );
};

export default AddAuthor;
