import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../api/api';

const Authors = () => {
    const [authors, setAuthors] = useState([]);
    const [filteredAuthors, setFilteredAuthors] = useState([]); // State for filtered authors
    const [searchTerm, setSearchTerm] = useState(''); // State for search term
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
            return;
        }

        axios.get(`${BASE_URL}/all-authors`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setAuthors(response.data.data);
            setFilteredAuthors(response.data.data); // Initialize filteredAuthors with all authors
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
            setError('Failed to fetch authors. Please try again.');
            setLoading(false);
        });
    }, [navigate]);

    useEffect(() => {
        // Filter authors based on the search term
        const results = authors.filter(author =>
            author.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredAuthors(results);
    }, [searchTerm, authors]); // Run this effect when searchTerm or authors change

    const handleDelete = (id) => {
        const token = localStorage.getItem('token');

        // Confirm deletion
        if (window.confirm('Are you sure you want to delete this author?')) {
            axios.delete(`${BASE_URL}/delete-author/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(() => {
                // Remove the deleted author from the state
                setAuthors(authors.filter(author => author.id !== id));
                setFilteredAuthors(filteredAuthors.filter(author => author.id !== id)); // Update filteredAuthors as well
                alert('Author deleted successfully!');
            })
            .catch(err => {
                console.error(err);
                alert('Error deleting author. Please try again.');
            });
        }
    };

    return (
        <div className="container mb-2">
            <h1 className="my-4">Author List</h1>
            <div className="mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search by author name..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
            </div>
            {loading && <p>Loading authors...</p>}
            {error && <p className="text-danger">{error}</p>}
            <div className="list-group">
                {filteredAuthors.length > 0 ? (
                    filteredAuthors.map(author => (
                        <div className="list-group-item d-flex justify-content-between align-items-center" key={author.id}>
                            <Link
                                to={`/author/${author.id}`}  // Navigate to the author details page
                                className="list-group-item list-group-item-action flex-grow-1 me-2"
                            >
                                {author.name}
                            </Link>
                            <div className="d-flex">
                                <button 
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => navigate(`/edit-author/${author.id}`)} // Navigate to the edit page
                                >
                                    Edit
                                </button>
                                <button 
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(author.id)} // Call delete function
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : !loading && !error ? (
                    <p>No authors available</p>
                ) : null}
            </div>
        </div>
    );
};

export default Authors;
