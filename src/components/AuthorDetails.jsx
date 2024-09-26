import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../api/api';

const AuthorDetails = () => {
    const { id } = useParams();  // Get author ID from URL
    const navigate = useNavigate();
    const [author, setAuthor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
            return;
        }

        // Fetch author details
        axios.get(`${BASE_URL}/author-detail/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.data) {
                setAuthor(response.data);  // Set author data if found
            } else {
                setError('Author not found.');  // Set error message if no data
            }
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
            setError('Failed to fetch author details.');  // Handle any other errors
            setLoading(false);
        });
    }, [id, navigate]);

    // Display loading state
    if (loading) return <p>Loading...</p>;

    // Display error message if there's an error
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <div className="container mt-4">
            {author ? (  // Check if author data exists
                <div>
                    <h3>{author.name}</h3>
                    <p>{author.bio}</p>
                    <h4>Books by {author.name}:</h4>
                    <ul>
                        {author.books && author.books.length > 0 ? (
                            author.books.map(book => (
                                <li key={book.id}>{book.title}</li>
                            ))
                        ) : (
                            <p>No books available by this author.</p>  // Handle case where no books are found
                        )}
                    </ul>
                </div>
            ) : (
                <p>Author not found.</p>  // Fallback message if author data is null
            )}
        </div>
    );
};

export default AuthorDetails;
