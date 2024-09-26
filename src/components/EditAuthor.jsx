import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../api/api'; // Ensure BASE_URL is correctly imported
import { useNavigate, useParams } from 'react-router-dom';

const EditAuthor = () => {
    const [author, setAuthor] = useState({
        name: '',
        bio: '' // Added bio field
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { id } = useParams(); // Get the author ID from the URL parameters

    useEffect(() => {
        const token = localStorage.getItem('token');

        // Fetch the existing author details using the ID
        axios.get(`${BASE_URL}/author-detail/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setAuthor(response.data); // Assuming the response contains the author object
        })
        .catch(err => {
            console.error(err);
            setError('Failed to fetch author details. Please try again.');
        });
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAuthor({ ...author, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        // API call to update the author
        axios.put(`${BASE_URL}/update-author/${id}`, author, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            alert('Author updated successfully!');
            navigate('/authors'); // Redirect to the authors list after successful update
        })
        .catch(err => {
            console.error(err);
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Error updating author');
            }
        });
    };

    return (
        <div className="container mb-2">
            <h1 className="my-4">Edit Author</h1>
            {error && <p className="text-danger">{error}</p>} {/* Display error message */}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Author Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        name="name" 
                        value={author.name} 
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
                        value={author.bio} 
                        onChange={handleInputChange} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Update Author</button>
            </form>
        </div>
    );
};

export default EditAuthor;
